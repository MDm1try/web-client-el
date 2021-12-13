import useSWR from "swr";

import { Post } from "@/types";
import api from "../../lib/api";

type State = {
  isLoading: boolean;
  posts?: Post[];
  error?: Error;
};

function useAccountPosts(): State {
  const { data, error } = useSWR<any, Error>(
    api.createAccountPostsUrl(),
    api.get,
  );

  return { error, posts: data, isLoading: !error && !data };
}

export default useAccountPosts;
