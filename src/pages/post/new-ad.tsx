import Head from "next/head";

import { AddNewPost } from "@/features/post";

import { Header } from "../../components/Header";

function NewAdPage() {
  return (
    <>
      <Head>
        <title>Post New Ad</title>
      </Head>
      <Header showSignOut />
      <AddNewPost />
    </>
  );
}

NewAdPage.private = true;

export default NewAdPage;
