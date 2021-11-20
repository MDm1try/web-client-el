import { PostTypeEnum, PostPurposeEnum } from "@/types";

export const LAND_PURPOSE_OPTIONS = [
  { value: PostPurposeEnum.AGRICULTURAL_LAND, name: `agricultural-land` },
  {
    value: PostPurposeEnum.LAND_FOR_HOUSING_AND_PUBLIC_BUILDINGS,
    name: `land-for-housing-and-public-buildings`,
  },
  { value: PostPurposeEnum.WELLNESS_LAND, name: `wellness-land` },
  {
    value: PostPurposeEnum.LAND_FOR_RECREATIONAL_PURPOSES,
    name: `land-for-recreational-purposes`,
  },
  { value: PostPurposeEnum.FORESTRY_LANDS, name: `forestry-lands` },
  { value: PostPurposeEnum.WATER_FUND_LAND, name: `water-fund-land` },
  {
    value: PostPurposeEnum.LAND_FOR_INDUSTRY_TRANSPORT_AND_OTHER_PURPOSES,
    name: `land-for-industry-transport-and-other-purposes`,
  },
  {
    value: PostPurposeEnum.LAND_STOCK_RESERVE_FUND_AND_COMMON_USE,
    name: `land-stock-reserve-fund-and-common-use`,
  },
];

export const POST_TYPE_OPTIONS = [
  { value: PostTypeEnum.LAND_RENT, name: `land-rent` },
  { value: PostTypeEnum.LAND_SALE, name: `land-sale` },
];
