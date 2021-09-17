import Head from "next/head";
import { useRouter } from "next/router";

import { Header } from "../../components/Header";
import { Account } from "../../features/account";

function AccountPage() {
  const router = useRouter();

  const { tab } = router.query as { tab: string };

  return (
    <>
      <Head>
        <title>Account</title>
      </Head>
      <Header showSignOut />
      <Account activeTab={tab} />
    </>
  );
}

AccountPage.private = true;

export default AccountPage;
