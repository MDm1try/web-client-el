import { useCallback, useRef, useState } from "react";
import throat from "throat";

import {
  ref,
  getStorage,
  getMetadata,
  uploadBytesResumable,
} from "firebase/storage";

import { Media } from "@/types";
import { FileUploadTask } from "@/types/upload";
import firebase from "../lib/firebase";

type FirebaseUploadOptions = {
  concurrency?: number;
};

type State = {
  progress: number;
  medias?: Array<Media>;
  isPending: boolean;
  error?: Error;
};

function useFileUpload(
  options?: FirebaseUploadOptions,
): [
  State,
  (tasks: FileUploadTask[], callback?: (medias: Media[]) => void) => void,
] {
  const concurrency = options?.concurrency || 20;
  const finsihedCount = useRef(0);

  const [uploadState, setUploadState] = useState<State>({
    progress: 0,
    isPending: false,
  });

  const uploadFiles = useCallback(
    async (
      fileUploadTasks: FileUploadTask[],
      callback?: (medias: Media[]) => void,
    ) => {
      if (uploadState.isPending || !fileUploadTasks.length) {
        return;
      }
      finsihedCount.current = 0;
      try {
        const medias = await Promise.all(
          fileUploadTasks.map(
            throat(
              concurrency,
              ({ file, bucket, key }) =>
                new Promise(
                  (
                    resolve: (media: Media) => void,
                    reject: (error: Error) => void,
                  ) => {
                    if (uploadState.error) {
                      reject(uploadState.error);
                      return;
                    }

                    const firebaseApp = firebase.getApp();
                    const storage = getStorage(firebaseApp, `gs://${bucket}`);
                    const storeRef = ref(storage, key);

                    const upload = uploadBytesResumable(storeRef, file, {
                      contentType: file.type,
                    });

                    upload.on(
                      `state_changed`,
                      ({ bytesTransferred, totalBytes }) => {
                        if (fileUploadTasks.length === 1) {
                          setUploadState({
                            isPending: true,
                            progress: bytesTransferred / totalBytes,
                          });
                        }
                      },
                      (error) => {
                        reject(error);
                      },
                      () => {
                        finsihedCount.current += 1;

                        setUploadState({
                          isPending: true,
                          progress:
                            finsihedCount.current / fileUploadTasks.length,
                        });

                        getMetadata(upload.snapshot.ref).then((meta) => {
                          resolve({
                            url: `gs://${bucket}/${meta.fullPath}`,
                            contentType: meta.contentType || file.type,
                            md5Hash: meta.md5Hash,
                            name: meta.name,
                          });
                        });
                      },
                    );
                  },
                ),
            ),
          ),
        );

        setUploadState({
          isPending: false,
          progress: 1,
          medias,
        });

        if (callback) {
          callback(medias);
        }
      } catch (err) {
        const error =
          err instanceof Error ? err : new Error(`Something went wrong`);
        setUploadState({
          error,
          isPending: false,
          progress: 0,
        });
      }
    },
    [concurrency, uploadState.error, uploadState.isPending],
  );

  return [uploadState, uploadFiles];
}

export default useFileUpload;
