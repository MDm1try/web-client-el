import Link from "next/link";
import useTranslation from "next-translate/useTranslation";

import css from "./SuccessResetPassword.module.scss";

function SuccessResetPassword() {
  const { t } = useTranslation(`common`);
  return (
    <div className={`${css.container} p-4`}>
      <div className="mt-4 mb-3 text-center">{t(`success-reset-password`)}</div>
      <Link href="/login">
        <a className="btn btn-primary w-100">{t(`sign-in`)}</a>
      </Link>
    </div>
  );
}

export default SuccessResetPassword;
