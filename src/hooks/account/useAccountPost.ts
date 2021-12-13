import useSWR from "swr";

import { Post } from "@/types";
import api from "../../lib/api";

type State = {
  isLoading: boolean;
  data?: Post;
  error?: Error;
};

function useAccountPost(postId: number): State {
  const { data, error } = useSWR<any, Error>(
    api.createAccountPostUrl(postId),
    api.get,
  );

  return { error, data, isLoading: !error && !data };
}

export default useAccountPost;
