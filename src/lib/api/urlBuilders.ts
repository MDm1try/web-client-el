import qs from "qs";

import {
  QueryLocationAutocompleteOptions,
  QueryPostOptions,
} from "../../types";

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

export function createAccountPostsUrl() {
  return createUrl(`/secure/posts`);
}

export function createPostsUrl(options?: QueryPostOptions) {
  return createUrl(`/shared/posts`, options);
}

export function createAccountPostUrl(postId: string) {
  return createUrl(`/secure/posts/${postId}`);
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

export function createLocationAutocompleteUrl(
  options?: QueryLocationAutocompleteOptions,
) {
  return createUrl(`/secure/geo-encoder/location-autocomplete`, options);
}
