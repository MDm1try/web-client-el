import Link from "next/link";
import { useForm } from "react-hook-form";
import classcat from "classcat";
import useTranslation from "next-translate/useTranslation";

import useRegister from "@/hooks/account/useRegister";

type FormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterForm = () => {
  const [{ isPending, error }, registerUser] = useRegister();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>();

  const handleRequest = ({ email, password, confirmPassword }: FormValues) => {
    registerUser(email, password, confirmPassword);
  };

  const { t } = useTranslation(`common`);

  return (
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
            required: `A valid email is required`,
            pattern: {
              message: `Invalid email address`,
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.0]+\.[A-Z]{2,}$/i,
            },
          })}
        />
        <div className="invalid-feedback">{errors?.email?.message}</div>
      </div>
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
              message: `A password must be at least 6 characters long`,
            },
            required: `A password is required`,
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
              message: `A password must be at least 6 characters long`,
            },
            required: `A confirm passowrd is required`,
          })}
        />
        <div className="invalid-feedback">
          {errors?.confirmPassword?.message}
        </div>
      </div>
      <div className="mb-4 form-check">
        <input type="checkbox" className="form-check-input" id="confirmation" />
        <label className="form-check-label" htmlFor="confirmation">
          {t(`i-agree`)}
          <Link href="/">
            <a>&nbsp;{t(`with-terms-of-use`)}</a>
          </Link>
        </label>
      </div>
      {error && <div className="text-danger mb-3">{error.message}</div>}
      <button
        type="submit"
        className="btn btn-primary w-100"
        disabled={isPending}
      >
        {t(`registration`)}
      </button>
    </form>
  );
};

export default RegisterForm;
