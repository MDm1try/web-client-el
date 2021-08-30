// This is an example of to protect an API route
import { getSession } from "next-auth/client";
import type { NextApiRequest, NextApiResponse } from "next";

async function protectedHandler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (session) {
    return res.send({
      content: `This is protected content. You can access this content because you are signed in.`,
    });
  }

  return res.send({
    error: `You must be sign in to view the protected content on this page.`,
  });
}

export default protectedHandler;
