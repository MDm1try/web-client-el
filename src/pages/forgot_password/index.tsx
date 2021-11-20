import Head from "next/head";
import useTranslation from "next-translate/useTranslation";

import { ForgotPassword } from "@/features/password";
import { Header } from "../../components/Header";

function ForgotPasswordPage() {
  const { t } = useTranslation(`common`);
  return (
    <>
      <Head>
        <title>{t(`forgot-password`)}</title>
      </Head>
      <Header />
      <ForgotPassword />
    </>
  );
}

export default ForgotPasswordPage;
