const bucket = process.env.FIREBASE_STORAGE_BUCKET;
const imageServiceUrl = process.env.IMAGE_SERVICE_URL;

export function getImageUri(gsUrl: string) {
  const arr = gsUrl.split(`/`).reverse();
  return `${imageServiceUrl}/${bucket}/o/${arr[0]}?alt=media`;
}
