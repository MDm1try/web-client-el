import Head from "next/head";

import { Header } from "../../components/Header";
import { Account } from "../../features/account";

function AccountPage() {
  return (
    <>
      <Head>
        <title>Account</title>
      </Head>
      <Header showSignOut />
      <Account />
    </>
  );
}

AccountPage.private = true;

export default AccountPage;
