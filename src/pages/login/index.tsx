import { useMemo } from "react";
import Head from "next/head";
import Link from "next/link";
import { withRouter, NextRouter } from "next/router";
import classcat from "classcat";
import { signIn, getProviders, ClientSafeProvider } from "next-auth/client";

import { Header } from "../../components/Header";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

import css from "./Login.module.scss";

export const LOGIN_TABS_MAP = {
  LOGIN: `login`,
  REGISTER: `register`,
};

type Props = {
  router: NextRouter;
  providers: Record<string, ClientSafeProvider>;
};

const TABS = [
  {
    name: `Войти`,
    tabName: LOGIN_TABS_MAP.LOGIN,
  },
  {
    name: `Регистрация`,
    tabName: LOGIN_TABS_MAP.REGISTER,
  },
];

function Login({ router, providers }: Props) {
  const { tab: activeTab = LOGIN_TABS_MAP.LOGIN } = router.query as {
    tab: string;
  };

  const handleSignInByCredentials = (email: string, password: string) => {
    signIn(`credentials`, {
      email,
      password,
      callbackUrl: `${window.location.origin}/account`,
    });
  };

  const handleSignInByProvider = (id: string) => {
    signIn(id, {
      callbackUrl: `${window.location.origin}/account`,
    });
  };

  const content = useMemo(() => {
    switch (activeTab) {
      case LOGIN_TABS_MAP.LOGIN:
      default:
        return (
          <LoginForm
            providers={providers}
            onSignInByCredentials={handleSignInByCredentials}
            onSignInByProvider={handleSignInByProvider}
          />
        );
      case LOGIN_TABS_MAP.REGISTER:
        return <RegisterForm />;
    }
  }, [activeTab, providers]);

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Header />
      <div className={`${css.container} rounded-2`}>
        <div className="p-4">
          <ul className="nav nav-tabs">
            {TABS.map((tab) => (
              <li key={tab.tabName} className="nav-item">
                <Link
                  href={{
                    pathname: `/login`,
                    query: { tab: tab.tabName },
                  }}
                >
                  <a
                    className={classcat([
                      `nav-link`,
                      { active: activeTab === tab.tabName },
                    ])}
                    aria-current="page"
                  >
                    {tab.name}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
          <div>{content}</div>
        </div>
      </div>
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

export default withRouter(Login);
