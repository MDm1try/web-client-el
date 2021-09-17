import useSWR from "swr";

import api from "../../lib/api";

type State = {
  isLoading: boolean;
  data?: { phone: string };
  error?: Error;
};

function usePhone(): State {
  const { data, error } = useSWR<any, Error>(api.createUserPhoneUrl(), api.get);

  return { error, data, isLoading: !error && !data };
}

export default usePhone;
