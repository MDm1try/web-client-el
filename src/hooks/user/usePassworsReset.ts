import { useCallback } from "react";

import api from "../../lib/api";
import usePromise from "../usePromise";

type State = {
  isPending: boolean;
  data?: boolean;
  error?: Error;
};

async function handleResetPassword(
  password: string,
  confirmPassword: string,
  token: string,
): Promise<boolean> {
  const url = api.createResetPasswordUrl();
  await api.put(url, { password, confirmPassword, token });

  return true;
}

function usePasswordReset(): [
  State,
  (
    password: string,
    confirmPassword: string,
    token: string,
  ) => Promise<boolean>,
] {
  const [{ isPending, error, data }, dispatch] = usePromise();

  const update = useCallback(
    (password: string, confirmPassword: string, token: string) =>
      dispatch(handleResetPassword(password, confirmPassword, token)),
    [dispatch],
  );

  return [{ isPending, error, data }, update];
}

export default usePasswordReset;
