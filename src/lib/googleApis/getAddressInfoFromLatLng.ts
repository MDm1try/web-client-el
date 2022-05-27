import qs from "qs";

import api from "@/lib/api";
import { ApiError } from "../error";

const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;

function createUrl(lat: number, lng: number, language: string) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json`;
  const queryString = qs.stringify({
    latlng: `${lat}, ${lng}`,
    key: googleMapsApiKey,
    language,
  });

  return `${url}?${queryString}`;
}

async function getAddressInfoFromLatLng(
  lat: number,
  lng: number,
  language = `en`,
): Promise<{
  isValid: boolean;
  data?: google.maps.GeocoderResponse;
  message?: string;
}> {
  try {
    const url = createUrl(lat, lng, language);
    const res = (await api.get(url)) as google.maps.GeocoderResponse;

    return {
      isValid: true,
      data: res,
    };
  } catch (err) {
    if (err instanceof ApiError) {
      return { isValid: false, message: err.message };
    }
    return { isValid: false, message: (err as Error).message };
  }
}

export default getAddressInfoFromLatLng;
