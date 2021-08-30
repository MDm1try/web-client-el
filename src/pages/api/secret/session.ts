// This is an example of how to access a session from an API route
import { getSession } from "next-auth/client";
import type { NextApiRequest, NextApiResponse } from "next";

async function session(req: NextApiRequest, res: NextApiResponse) {
  const sessionData = await getSession({ req });

  return res.send(JSON.stringify(sessionData, null, 2));
}

export default session;
