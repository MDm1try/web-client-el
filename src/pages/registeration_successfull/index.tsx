import Head from "next/head";
import Link from "next/link";

import css from "./RegisterationSuccess.module.css";

export default function RegisterationSuccess() {
  return (
    <div className={css.container}>
      <Head>
        <title>Confirmation</title>
      </Head>
      <h3>Registration Succesfull</h3>
      <div>Please, confirm your email</div>
      <Link href="/login">
        <a className="btn btn-primary mt-3">Login</a>
      </Link>
    </div>
  );
}
