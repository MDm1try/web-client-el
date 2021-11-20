import classcat from "classcat";
import useTranslation from "next-translate/useTranslation";
import { useForm } from "react-hook-form";

import css from "./ForgotPasswordForm.module.scss";

type FormValues = {
  email: string;
};
type Props = {
  isPending: boolean;
  error?: Error;
  onSendResetLink(email: string): void;
};

function ForgotPasswordForm({ isPending, onSendResetLink, error }: Props) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>();

  const handleRequest = ({ email }: FormValues) => {
    onSendResetLink(email);
  };

  const { t } = useTranslation(`common`);

  return (
    <div className={`${css.container} p-4`}>
      <h3> {t(`forgot-password`)}</h3>
      <form onSubmit={handleSubmit(handleRequest)}>
        <div className="mt-4 mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            id="email"
            type="email"
            className={classcat([
              `form-control`,
              { "is-invalid": !!errors?.email?.message },
            ])}
            {...register(`email`, {
              required: t(`errors:required-email`),
              pattern: {
                message: t(`errors:email-not-valid`),
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.0]+\.[A-Z]{2,}$/i,
              },
            })}
          />
          <div className="invalid-feedback">{errors?.email?.message}</div>
          {error && <div className="text-danger mb-3">{error.message}</div>}
        </div>
        <button
          type="submit"
          className="btn btn-primary w-100 mt-3"
          disabled={isPending}
        >
          {t(`reset-password-btn`)}
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

export default ForgotPasswordForm;
