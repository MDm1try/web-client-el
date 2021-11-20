export type FileUploadTask = {
  file: File;
  bucket: string;
  key: string;
};

export type FileUploadOptions = {
  bucket: string;
  accept: string;
  multiple: boolean;
  createKey(file: File): string;
};
