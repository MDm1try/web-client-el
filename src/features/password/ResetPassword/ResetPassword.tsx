import usePasswordToken from "@/hooks/account/usePasswordToken";
import useTranslation from "next-translate/useTranslation";

import classcat from "classcat";
import { ResetPasswordForm } from "./ResetPasswordForm";
import css from "./ResetPassword.module.css";

type Props = {
  token: string;
};
function ResetPassword({ token }: Props) {
  // todo add loading
  const { isLoading, data } = usePasswordToken(token);

  const { t } = useTranslation(`errors`);

  if (isLoading) {
    return (
      <div className={css.container}>
        <div
          className={classcat([css.spinnerWrapper, `spinner-border`])}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <> {data ? <ResetPasswordForm token={token} /> : t(`token-not-valid`)}</>
  );
}

export default ResetPassword;
