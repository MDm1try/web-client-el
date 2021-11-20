import { FileUploadOptions, FileUploadTask } from "@/types";

export function createFileUploadTask(
  file: File,
  optionMap: Map<string, FileUploadOptions>,
): FileUploadTask {
  let option = optionMap.get(file.type);
  option =
    optionMap.get(file.type) ??
    optionMap.get(file.type.split(`/`)[0]) ??
    optionMap.get(`*`);

  if (!option) {
    throw new Error(`The file type of ${file.name} is not supported`);
  }

  return {
    key: option.createKey(file),
    file,
    bucket: option.bucket,
  };
}
