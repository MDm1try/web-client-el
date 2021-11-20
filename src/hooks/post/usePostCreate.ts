import { Post } from "@/types";
import { useCallback } from "react";

import api from "../../lib/api";
import usePromise from "../usePromise";

type State = {
  isPending: boolean;
  data?: boolean;
  error?: Error;
};

async function handleAddPost(newPost: Post) {
  await api.post(api.createPostUrl(), newPost);

  return true;
}

function usePostCreate(): [State, (newPost: Post) => Promise<boolean>] {
  const [{ isPending, error, data }, dispatch] = usePromise();

  const create = useCallback(
    (newPost: Post) => dispatch(handleAddPost(newPost)),
    [dispatch],
  );

  return [{ isPending, error, data }, create];
}

export default usePostCreate;
