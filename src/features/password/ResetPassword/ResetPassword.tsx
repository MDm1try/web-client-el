import usePasswordToken from "@/hooks/user/usePasswordToken";
import useTranslation from "next-translate/useTranslation";

import { ResetPasswordForm } from "./ResetPasswordForm";

type Props = {
  token: string;
};
function ResetPassword({ token }: Props) {
  // todo add loading
  const { data } = usePasswordToken(token);

  const { t } = useTranslation(`errors`);
  return (
    <>{data ? <ResetPasswordForm token={token} /> : t(`token-not-valid`)}</>
  );
}

export default ResetPassword;
