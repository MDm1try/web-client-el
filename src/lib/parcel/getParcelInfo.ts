import api from "@/lib/api";
import { ParcelInfo } from "@/types/parcel";
import { ApiError } from "../error";

async function getParcelInfo(
  cadNum: string,
): Promise<{ isValid: boolean; data?: ParcelInfo; message?: string }> {
  try {
    const res = await api.get(api.createParcelInfoInUrl(cadNum));
    return { isValid: true, data: res as ParcelInfo };
  } catch (err) {
    if (err instanceof ApiError) {
      return { isValid: false, message: err.message };
    }
    return { isValid: true };
  }
}

export default getParcelInfo;
