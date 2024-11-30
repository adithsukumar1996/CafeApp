import { AddEmployeeRequest } from "./AddEmployeeRequest";

export interface EditEmployeeRequest extends AddEmployeeRequest {
  id: string;
}

export const isEditEmployeeRequest = (
  obj: AddEmployeeRequest | EditEmployeeRequest
): obj is EditEmployeeRequest => {
  return (obj as EditEmployeeRequest).id !== undefined;
};

export const isAddEmployeeRequest = (
  obj: AddEmployeeRequest | EditEmployeeRequest
): obj is AddEmployeeRequest => {
  return (obj as EditEmployeeRequest).id === undefined;
};
