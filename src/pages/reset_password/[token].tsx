import Head from "next/head";

import { useRouter } from "next/router";
import { ResetPassword } from "@/features/password";
import { Header } from "../../components/Header";

function ResetPasswordPage() {
  const router = useRouter();

  const { token } = router.query as { token: string };
  return (
    <>
      <Head>
        <title>Reset Password</title>
      </Head>
      <Header />
      <ResetPassword token={token} />
    </>
  );
}

export default ResetPasswordPage;
