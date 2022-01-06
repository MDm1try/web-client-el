import Head from "next/head";

import { Post } from "@/features/post";
import { Header } from "../../../components/Header";

function PostPage() {
  return (
    <>
      <Head>
        <title>Posts</title>
      </Head>
      <Header showSignOut />
      <Post />
    </>
  );
}

export default PostPage;
