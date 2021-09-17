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

export function createUpdateUserPhoneUrl() {
  return createUrl(`/secure/profile/phone`);
}
