import Link from "next/link";
import useTranslation from "next-translate/useTranslation";

import css from "./SuccessForgotPassword.module.scss";

function SuccessForgotPassword() {
  const { t } = useTranslation(`common`);
  return (
    <div className={`${css.container} p-4`}>
      <div className="mt-4 mb-3 text-center">
        {t(`success-forgot-password`)}
      </div>
      <Link href="/">
        <a className="btn btn-primary w-100">{t(`ok`)}</a>
      </Link>
    </div>
  );
}

export default SuccessForgotPassword;
