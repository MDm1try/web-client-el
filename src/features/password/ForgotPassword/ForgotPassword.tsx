import useEmailReset from "@/hooks/user/useEmailReset";
import { ForgotPasswordForm } from "./ForgotPasswordForm";
import { SuccessForgotPassword } from "./SuccessForgotPassword";

function ForgotPassword() {
  const [{ isPending, error, data }, emailReset] = useEmailReset();

  const handleSendResetLink = (email: string) => {
    emailReset(email);
  };

  return (
    <>
      {data ? (
        <SuccessForgotPassword />
      ) : (
        <ForgotPasswordForm
          isPending={isPending}
          error={error}
          onSendResetLink={handleSendResetLink}
        />
      )}
    </>
  );
}

export default ForgotPassword;
