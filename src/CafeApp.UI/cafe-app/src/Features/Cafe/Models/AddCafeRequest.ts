export interface AddCafeRequest {
  name: string;
  description: string;
  logoBase64?: string;
  location: string;
}

export interface AddCafeRequestWithFiles extends AddCafeRequest {
  logoFiles?: FileList;
}

export const defaultAddCafeRequest: AddCafeRequestWithFiles = {
  name: "",
  description: "",
  logoBase64: "",
  location: "",
};
