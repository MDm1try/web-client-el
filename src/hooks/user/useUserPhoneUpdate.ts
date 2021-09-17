import { useCallback } from "react";

import api from "../../lib/api";
import usePromise from "../usePromise";

type State = {
  isPending: boolean;
  data?: boolean;
  error?: Error;
};

async function handleUpatePhone(phone: string) {
  await api.put(api.createUpdateUserPhoneUrl(), { phone });

  return true;
}

function useUserPhoneUpdate(): [State, (phone: string) => Promise<boolean>] {
  const [{ isPending, error, data }, dispatch] = usePromise();

  const register = useCallback(
    (phone: string) => dispatch(handleUpatePhone(phone)),
    [dispatch],
  );

  return [{ isPending, error, data }, register];
}

export default useUserPhoneUpdate;
