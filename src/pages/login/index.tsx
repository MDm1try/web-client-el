import Head from "next/head";
import { withRouter, NextRouter } from "next/router";
import { getProviders, ClientSafeProvider } from "next-auth/client";

import { Login } from "@/features/login";
import { Header } from "../../components/Header";

type Props = {
  router: NextRouter;
  providers: Record<string, ClientSafeProvider>;
};

function LoginPage({ router, providers }: Props) {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Header />
      <Login router={router} providers={providers} />
    </>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}

export default withRouter(LoginPage);
