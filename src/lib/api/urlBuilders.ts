import qs from "qs";

const baseUrl = process.env.API_BASE_URL;

export function createUrl(url: string, params?: Record<string, unknown>) {
  const fullUrl = `${baseUrl}${url}`;
  const queryString = params && qs.stringify(params);

  return queryString ? `${fullUrl}?${queryString}` : fullUrl;
}

export function createSignInUrl() {
  return createUrl(`/auth/login`);
}

export function createRegisterUrl() {
  return createUrl(`/auth/register`);
}

export function createAcceptInvitationUrl() {
  return createUrl(`/auth/invite/accept`);
}

export function createUserPhoneUrl() {
  return createUrl(`/secure/profile/phone`);
}

export function createUserNameUrl() {
  return createUrl(`/secure/profile/name`);
}

export function createParcelInfoInUrl(cadNum: string) {
  return createUrl(`/secure/parcel`, { cadNum });
}

export function createPostUrl() {
  return createUrl(`/secure/posts`);
}

export function createForgotPasswordUrl() {
  return createUrl(`/auth/password/forgot`);
}

export function createTokenResetPasswordUrl(token: string) {
  return createUrl(`/auth/password/reset/${token}`);
}

export function createResetPasswordUrl() {
  return createUrl(`/auth/password/reset`);
}
