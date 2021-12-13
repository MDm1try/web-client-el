import { NewPost } from "@/types";
import { useCallback } from "react";

import api from "../../lib/api";
import usePromise from "../usePromise";

type State = {
  isPending: boolean;
  data?: boolean;
  error?: Error;
};

async function handleAddPost(newPost: NewPost) {
  await api.post(api.createAccountPostsUrl(), newPost);

  return true;
}

function usePostCreate(): [State, (newPost: NewPost) => Promise<boolean>] {
  const [{ isPending, error, data }, dispatch] = usePromise();

  const create = useCallback(
    (newPost: NewPost) => dispatch(handleAddPost(newPost)),
    [dispatch],
  );

  return [{ isPending, error, data }, create];
}

export default usePostCreate;
