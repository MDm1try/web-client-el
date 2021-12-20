import useSWR from "swr";

import { Post, QueryPostOptions } from "@/types";
import api from "../../lib/api";

type State = {
  isLoading: boolean;
  data?: Post[];
  error?: Error;
};

function usePosts(queryOptions: QueryPostOptions): State {
  const { data, error } = useSWR<any, Error>(
    api.createPostsUrl(queryOptions),
    api.get,
  );

  return { error, data, isLoading: !error && !data };
}

export default usePosts;
