import { useCallback } from "react";

import api from "../../lib/api";
import usePromise from "../usePromise";

type State = {
  isPending: boolean;
  data?: boolean;
  error?: Error;
};

async function handleSendEmail(email: string): Promise<boolean> {
  const url = api.createForgotPasswordUrl();
  await api.post(url, { email });

  return true;
}

function useEmailReset(): [State, (email: string) => Promise<boolean>] {
  const [{ isPending, error, data }, dispatch] = usePromise();

  const update = useCallback(
    (email: string) => dispatch(handleSendEmail(email)),
    [dispatch],
  );

  return [{ isPending, error, data }, update];
}

export default useEmailReset;
