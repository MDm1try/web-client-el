import { JWT } from "next-auth/jwt";

export async function refreshAccessToken(token: JWT) {
  try {
    const params = new URLSearchParams({
      client_id: process.env.GOOGLE_ID as string,
      client_secret: process.env.GOOGLE_SECRET as string,
      grant_type: `refresh_token`,
      refresh_token: token.refreshToken as string,
    });

    const url = `https://oauth2.googleapis.com/token?${params}`;

    const response = await fetch(url, {
      headers: {
        "Content-Type": `application/x-www-form-urlencoded`,
      },
      method: `POST`,
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);

    return {
      ...token,
      error: `RefreshAccessTokenError`,
    };
  }
}
