import { useCallback } from "react";
import { mutate } from "swr";

import api from "../../lib/api";
import usePromise from "../usePromise";

type State = {
  isPending: boolean;
  data?: boolean;
  error?: Error;
};

async function handleUpateName(firstName: string, lastName: string) {
  const url = api.createUserNameUrl();
  await api.put(url, { firstName, lastName });

  mutate(url, { firstName, lastName });

  return true;
}

function useNameUpdate(): [
  State,
  (firstName: string, lastName: string) => Promise<boolean>,
] {
  const [{ isPending, error, data }, dispatch] = usePromise();

  const update = useCallback(
    (firstName: string, lastName: string) =>
      dispatch(handleUpateName(firstName, lastName)),
    [dispatch],
  );

  return [{ isPending, error, data }, update];
}

export default useNameUpdate;
