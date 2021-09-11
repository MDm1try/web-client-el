import { signIn, useSession } from "next-auth/client";
import { useEffect } from "react";

type Props = {
  children: JSX.Element;
};

function Auth({ children }: Props) {
  const [session, loading] = useSession();
  const isUser = !!session?.user;

  useEffect(() => {
    if (loading) return; // Do nothing while loading
    if (!isUser) signIn(); // If not authenticated, force log in
  }, [isUser, loading]);

  if (isUser) {
    return children;
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <div>Loading...</div>;
}

export default Auth;
