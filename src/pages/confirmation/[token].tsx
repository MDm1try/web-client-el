import { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";

import useAcceptInvitation from "@/hooks/user/useAcceptInvitation";

import css from "./Confirmation.module.css";

export default function Confirm() {
  const router = useRouter();

  const [{ isPending, error, data }, accpet] = useAcceptInvitation();

  useEffect(() => {
    if (router.query?.token) {
      accpet(router.query.token as string);
    }
  }, [router.query?.token, accpet]);

  return (
    <div className={css.container}>
      <Head>
        <title>Confirmation</title>
      </Head>
      {data
        ? `Thank you for accepting our invitation, and welcome`
        : `Accepting...`}
      {error && <div className="text-danger my-2">{error.message}</div>}
      {!isPending && (
        <Link href="/login">
          <a className="btn btn-primary mt-3">Login</a>
        </Link>
      )}
    </div>
  );
}
