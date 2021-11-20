import Head from "next/head";

import css from "./Posts.module.css";

export default function Posts() {
  return (
    <>
      <Head>
        <title>Posts</title>
      </Head>
      <div className={css.container}>Posts</div>
    </>
  );
}
