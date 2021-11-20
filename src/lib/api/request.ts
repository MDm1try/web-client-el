import { getSession } from "next-auth/client";
import { JsonBody, JsonResponse } from "./types";
import { ApiError } from "../error";

async function parseBody(res: Response): Promise<JsonResponse> {
  const contentType = res.headers.get(`Content-Type`);
  if (!contentType || contentType.startsWith(`text/`)) {
    return { text: await res.text() };
  }
  return res.json();
}

async function createHeaders() {
  let accessToken = ``;
  let idToken = ``;

  const session = await getSession();
  if (session) {
    accessToken = session?.accessToken as string;
    idToken = session?.idToken as string;
  }

  const headers = new Headers({
    "Content-Type": `application/json`,
    Accept: `application/json`,
  });

  if (accessToken) {
    headers.append(`provider`, `own`);
    headers.append(`access_token`, `Bearer ${accessToken}`);
  }

  if (idToken) {
    headers.append(`provider`, `google`);
    headers.append(`id_token`, idToken);
  }

  return headers;
}

function checkStatusCode(res: Response, body: JsonResponse) {
  if (res.ok) {
    return;
  }

  const statusMessage =
    res.statusText ?? `Status code ${res.status} did not indicate success`;

  if (Array.isArray(body)) {
    throw new ApiError(res.status, statusMessage);
  } else if (body.error) {
    throw new ApiError(res.status, body.error);
  } else if (body.text) {
    throw new ApiError(res.status, body.text);
  } else {
    throw new ApiError(res.status, statusMessage);
  }
}

async function handleError(error: any /* req: Request */) {
  // logger.error(error.message, {
  //   error,
  //   request: {
  //     url: req.url,
  //     method: req.method,
  //     body: req.body,
  //   },
  // });

  if (error instanceof ApiError) {
    if (error.statusCode === 401) {
      // await signIn();
    }
  }

  throw error;
}

// eslint-disable-next-line consistent-return
export default async function request(
  url: string,
  method: RequestInit["method"],
  data?: JsonBody,
): Promise<JsonResponse | undefined> {
  const init = {
    method,
    headers: await createHeaders(),
  } as RequestInit;

  if (data) {
    init.body = JSON.stringify(data);
  }
  const req = new Request(url, init);

  try {
    const res = await fetch(req);
    const body = await parseBody(res);
    checkStatusCode(res, body);

    return body;
  } catch (error) {
    await handleError(error, req);
  }
}
