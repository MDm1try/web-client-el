import Head from "next/head";
import { useRouter } from "next/router";

import { Header } from "../../components/Header";
import AccountTabs from "./AccountTabs";

function Account() {
  const router = useRouter();

  const { tab } = router.query as { tab: string };

  return (
    <>
      <Head>
        <title>Account</title>
      </Head>
      <Header showSignOut />
      <AccountTabs activeTab={tab} />
    </>
  );
}

Account.private = true;

export default Account;
