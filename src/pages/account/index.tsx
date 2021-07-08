import Head from "next/head";

import styles from "./Account.module.css";

export default function Account() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Account</title>
      </Head>
      Account
    </div>
  );
}
