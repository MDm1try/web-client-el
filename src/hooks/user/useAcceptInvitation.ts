import { useCallback } from "react";

import api from "../../lib/api";
import usePromise from "../usePromise";

type State = {
  isPending: boolean;
  data?: boolean;
  error?: Error;
};

async function handleAccept(token: string) {
  await api.put(api.createAcceptInvitationUrl(), { token });
  return true;
}

function useAcceptInvitation(): [State, (token: string) => Promise<boolean>] {
  const [{ isPending, error, data }, dispatch] = usePromise();

  const accept = useCallback(
    (token: string) => dispatch(handleAccept(token)),
    [dispatch],
  );

  return [{ isPending, error, data }, accept];
}

export default useAcceptInvitation;
