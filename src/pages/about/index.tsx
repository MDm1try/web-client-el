import Head from "next/head";

import styles from "./About.module.css";

export default function About() {
  return (
    <div className={styles.container}>
      <Head>
        <title>About</title>
      </Head>
      About
    </div>
  );
}
