import Head from "next/head";
import Link from "next/link";

import css from "./RegistrationSuccess.module.css";

function RegistrationSuccess() {
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

export default RegistrationSuccess;
