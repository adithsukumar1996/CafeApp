import { AddCafeRequest, AddCafeRequestWithFiles } from "./AddCafeRequest";

export interface EditCafeRequest extends AddCafeRequest {
  id: string;
}
export interface EditCafeRequestWithFiles
  extends EditCafeRequest,
    AddCafeRequestWithFiles {}

export const isEditCafeRequest = (
  obj: AddCafeRequest | EditCafeRequest
): obj is EditCafeRequest => {
  return (obj as EditCafeRequest).id !== undefined;
};
