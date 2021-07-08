import Head from "next/head";

import styles from "./Posts.module.css";

export default function Posts() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Posts</title>
      </Head>
      Posts
    </div>
  );
}
