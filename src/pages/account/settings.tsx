import Head from "next/head";

import { AccountLayout, AccountSettings } from "@/features/account";
import { Header } from "../../components/Header";

function SettingsPage() {
  return (
    <>
      <Head>
        <title>Settings</title>
      </Head>
      <Header showSignOut />
      <AccountLayout>
        <AccountSettings />
      </AccountLayout>
    </>
  );
}

SettingsPage.private = true;

export default SettingsPage;
