import { useCallback } from "react";
import { mutate } from "swr";

import api from "../../lib/api";
import usePromise from "../usePromise";

type State = {
  isPending: boolean;
  data?: boolean;
  error?: Error;
};

async function handleUpatePhone(phone: string) {
  const url = api.createUserPhoneUrl();
  await api.put(url, { phone });
  mutate(url, { phone });
  return true;
}

function useUserPhoneUpdate(): [State, (phone: string) => Promise<boolean>] {
  const [{ isPending, error, data }, dispatch] = usePromise();

  const update = useCallback(
    (phone: string) => dispatch(handleUpatePhone(phone)),
    [dispatch],
  );

  return [{ isPending, error, data }, update];
}

export default useUserPhoneUpdate;
