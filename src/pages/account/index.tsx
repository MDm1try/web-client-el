import Head from "next/head";
import { withRouter, NextRouter } from "next/router";
// import { useSession } from "next-auth/client";

import { Header } from "../../components/Header";
import AccountTabs from "./AccountTabs";

type Props = {
  router: NextRouter;
};

function Account({ router }: Props) {
  const { tab } = router.query as { tab: string };
  // const [session] = useSession();
  // console.log(session);
  return (
    <>
      <Head>
        <title>Account</title>
      </Head>
      <Header />
      <AccountTabs activeTab={tab} />
    </>
  );
}

export default withRouter(Account);
