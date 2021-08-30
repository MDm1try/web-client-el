import Router from "next/router";
import { useCallback } from "react";

import api from "../../lib/api";
import usePromise from "../usePromise";

type State = {
  isPending: boolean;
  data?: boolean;
  error?: Error;
};

async function handleRegister(
  email: string,
  password: string,
  confirmPassword: string,
) {
  await api.post(api.createRegisterUrl(), { email, password, confirmPassword });
  Router.push(`/registeration_successfull`);

  return true;
}

function useRegister(): [
  State,
  (
    email: string,
    password: string,
    confirmPassword: string,
  ) => Promise<boolean>,
] {
  const [{ isPending, error, data }, dispatch] = usePromise();

  const register = useCallback(
    (email: string, password: string, confirmPassword: string) =>
      dispatch(handleRegister(email, password, confirmPassword)),
    [dispatch],
  );

  return [{ isPending, error, data }, register];
}

export default useRegister;
