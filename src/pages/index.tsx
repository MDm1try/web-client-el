import Head from "next/head";

import css from "@/styles/Home.module.css";

export default function Home() {
  return (
    <div className={css.container}>
      <Head>
        <title>Home</title>
      </Head>
      Home
    </div>
  );
}
