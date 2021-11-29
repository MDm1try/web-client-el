import useSWR from "swr";

import { Post } from "@/types";
import api from "../../lib/api";

type State = {
  isLoading: boolean;
  data?: Post;
  error?: Error;
};

function usePost(postId: number): State {
  const { data, error } = useSWR<any, Error>(
    api.createPostUrl(postId),
    api.get,
  );

  return { error, data, isLoading: !error && !data };
}

export default usePost;
