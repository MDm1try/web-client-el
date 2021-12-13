import useSWR from "swr";

import api from "../../lib/api";

type State = {
  isLoading: boolean;
  data?: { firstName: string; lastName: string };
  error?: Error;
};

function useName(): State {
  const { data, error } = useSWR<any, Error>(api.createUserNameUrl(), api.get);

  return { error, data, isLoading: !error && !data };
}

export default useName;
