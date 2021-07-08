import request from "./request";
import { JsonBody } from "./types";
import * as urlBuilders from "./urlBuilders";

export default {
  ...urlBuilders,
  get: (url: string) => request(url, `GET`),
  delete: (url: string) => request(url, `DELETE`),
  put: (url: string, data?: JsonBody) => request(url, `PUT`, data),
  post: (url: string, data?: JsonBody) => request(url, `POST`, data),
  patch: (url: string, data?: JsonBody) => request(url, `PATCH`, data),
};

export * from "./types";
