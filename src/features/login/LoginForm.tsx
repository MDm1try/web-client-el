import classcat from "classcat";
import Link from "next/link";
import { useForm } from "react-hook-form";
import useTranslation from "next-translate/useTranslation";
import { ClientSafeProvider } from "next-auth/client";
import { useMemo } from "react";
import { useRouter } from "next/router";

type FormValues = {
  email: string;
  password: string;
};

type Props = {
  providers: Record<string, ClientSafeProvider>;
  onSignInByCredentials: (email: string, password: string) => void;
  onSignInByProvider: (id: string) => void;
};

const LoginForm = ({
  providers,
  onSignInByCredentials,
  onSignInByProvider,
}: Props) => {
  const { t } = useTranslation(`common`);
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>();

  const handleRequest = ({ email, password }: FormValues) =>
    onSignInByCredentials(email, password);

  const authProviders = useMemo(
    () =>
      Object.values(providers).filter(
        (provider) => provider.id !== `credentials`,
      ),
    [providers],
  );

  return (
    <form onSubmit={handleSubmit(handleRequest)}>
      {authProviders.map((provider) => (
        <div key={provider.name}>
          <button type="button" onClick={() => onSignInByProvider(provider.id)}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}

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
          {t(`your-current-password`)}
        </label>
        <input
          id="password"
          type="password"
          className={classcat([
            `form-control`,
            { "is-invalid": !!errors?.password?.message },
          ])}
          {...register(`password`, {
            required: `A password is required`,
          })}
        />
        <div className="invalid-feedback">{errors?.password?.message}</div>
      </div>
      <div className="mb-4">
        <Link href="/reset">
          <a>{t(`can-not-login?`)}</a>
        </Link>
      </div>
      {router.query?.error && (
        <div className="text-danger mb-3">{router.query.error}</div>
      )}
      <button type="submit" className="btn btn-primary w-100">
        {t(`sign-in`)}
      </button>
    </form>
  );
};

export default LoginForm;
