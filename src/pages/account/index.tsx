import Head from "next/head";

import { AccountPosts } from "@/features/post";
import { Header } from "../../components/Header";
import { AccountLayout } from "../../features/account";

function AccountPage() {
  return (
    <>
      <Head>
        <title>Account</title>
      </Head>
      <Header showSignOut />
      <AccountLayout>
        <AccountPosts />
      </AccountLayout>
    </>
  );
}

AccountPage.private = true;

export default AccountPage;
