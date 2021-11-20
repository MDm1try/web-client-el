import useSWR from "swr";

import api from "../../lib/api";

type State = {
  isLoading: boolean;
  data?: boolean;
  error?: Error;
};

function usePasswordToken(token: string): State {
  const { data, error } = useSWR<any, Error>(
    api.createTokenResetPasswordUrl(token),
    api.get,
  );

  return { isLoading: !error && !data, error, data };
}

export default usePasswordToken;
