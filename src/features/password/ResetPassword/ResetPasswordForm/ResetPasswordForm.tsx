import classcat from "classcat";
import { useForm } from "react-hook-form";
import usePasswordReset from "@/hooks/account/usePassworsReset";
import useTranslation from "next-translate/useTranslation";

import { SuccessResetPassword } from "../SuccessResetPassword";
import css from "./ResetPasswordForm.module.scss";

type FormValues = {
  password: string;
  confirmPassword: string;
};
type Props = {
  token: string;
};

function ResetPasswordForm({ token }: Props) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>();

  const [{ isPending, error, data }, resetPassword] = usePasswordReset();

  const { t } = useTranslation(`common`);
  // const { t: te } = useTranslation(`errors`);

  const handleSendResetLink = ({ password, confirmPassword }: FormValues) => {
    resetPassword(password, confirmPassword, token);
  };

  if (data) {
    return <SuccessResetPassword />;
  }

  return (
    <div className={`${css.container} p-4`}>
      <form onSubmit={handleSubmit(handleSendResetLink)}>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            {t(`enter-your-password`)}
          </label>
          <input
            id="password"
            className={classcat([
              `form-control`,
              { "is-invalid": !!errors?.password?.message },
            ])}
            type="password"
            {...register(`password`, {
              minLength: {
                value: 6,
                message: t(`errors:long-password`),
              },
              required: t(`errors:required-password`),
            })}
          />
          <div className="invalid-feedback">{errors?.password?.message}</div>
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            {t(`confirm-your-password`)}
          </label>
          <input
            id="confirmPassword"
            type="password"
            className={classcat([
              `form-control`,
              { "is-invalid": !!errors?.password?.message },
            ])}
            {...register(`confirmPassword`, {
              minLength: {
                value: 6,
                message: t(`errors:long-password`),
              },
              required: t(`errors:required-password`),
            })}
          />
          <div className="invalid-feedback">
            {errors?.confirmPassword?.message}
          </div>
        </div>
        {error && <div className="text-danger mb-3">{error.message}</div>}
        <button
          type="submit"
          className="btn btn-primary mt-3 w-100"
          disabled={isPending}
        >
          {t(`update-password`)}
          {isPending && (
            <div
              className="spinner-border spinner-border-sm ms-2"
              role="status"
            />
          )}
        </button>
      </form>
    </div>
  );
}

export default ResetPasswordForm;
