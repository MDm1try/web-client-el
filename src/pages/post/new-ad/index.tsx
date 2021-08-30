import Head from "next/head";

import { Header } from "../../../components/Header";
import NewAdForm from "./NewAdForm";

export default function Posts() {
  return (
    <>
      <Head>
        <title>Post New Ad</title>
      </Head>
      <Header />
      <NewAdForm />
    </>
  );
}
