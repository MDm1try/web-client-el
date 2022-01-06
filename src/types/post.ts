import { Media } from "./media";

export enum CurrencyCodeEnum {
  "UAH" = `UAH`,
  "USD" = `USD`,
  "EUR" = `EUR`,
}

export enum CostPerEnum {
  PER_YEAR = `per-year`,
  PER_MONTH = `per-month`,
}

export enum CurrencyFontEnum {
  "UAH" = `грн`,
  "USD" = `$`,
  "EUR" = `€`,
}

export enum PostTypeEnum {
  "LAND_RENT" = 0,
  "LAND_SALE" = 1,
}

export enum PostPurposeEnum {
  "AGRICULTURAL_LAND" = 0,
  "LAND_FOR_HOUSING_AND_PUBLIC_BUILDINGS" = 1,
  "WELLNESS_LAND" = 2,
  "LAND_FOR_RECREATIONAL_PURPOSES" = 3,
  "FORESTRY_LANDS" = 4,
  "WATER_FUND_LAND" = 5,
  "LAND_FOR_INDUSTRY_TRANSPORT_AND_OTHER_PURPOSES" = 6,
  "LAND_STOCK_RESERVE_FUND_AND_COMMON_USE" = 7,
}

export enum ImagePostEnum {
  image0 = `image0`,
  image1 = `image1`,
  image2 = `image2`,
  image3 = `image3`,
  image4 = `image4`,
  image5 = `image5`,
  image6 = `image6`,
  image7 = `image7`,
  image8 = `image8`,
  image9 = `image9`,
}

export type GeneralInfoPostForm = {
  name: string;
  cadNum: string;
  areaHectares: string;
  type: PostTypeEnum;
  purpose: PostPurposeEnum;
  cost: number;
  costPer?: CostPerEnum;
  currency: CurrencyCodeEnum;
  description: string;
  shape: google.maps.LatLngLiteral[];
};

export type ImagePostForm = {
  [ImagePostEnum.image0]?: FileList;
  [ImagePostEnum.image1]?: FileList;
  [ImagePostEnum.image2]?: FileList;
  [ImagePostEnum.image3]?: FileList;
  [ImagePostEnum.image4]?: FileList;
  [ImagePostEnum.image5]?: FileList;
  [ImagePostEnum.image6]?: FileList;
  [ImagePostEnum.image7]?: FileList;
  [ImagePostEnum.image8]?: FileList;
  [ImagePostEnum.image9]?: FileList;
};

export type MapForm = {
  shape: google.maps.LatLngLiteral[];
};

export type PostForm = GeneralInfoPostForm & ImagePostForm & MapForm;

export type NewPost = GeneralInfoPostForm &
  MapForm & {
    medias: Media[];
  };

export type Post = GeneralInfoPostForm & {
  id: number;
  medias: Media[];
  publishedAt?: string;
  createdAt?: string;
};

export type QueryPostOptions = {
  sortOrder: string;
  sortBy: string;
  limit: number;
  search: string;
  page: number;
};
