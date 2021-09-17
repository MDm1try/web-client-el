import { useCallback } from "react";

import api from "../../lib/api";
import usePromise from "../usePromise";

type State = {
  isPending: boolean;
  data?: boolean;
  error?: Error;
};

async function handleUpateName(firstName: string, lastName: string) {
  await api.put(api.createUserName(), { firstName, lastName });

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
