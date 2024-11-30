import { AddEmployeeRequest } from "./AddEmployeeRequest";

export interface EditEmployeeRequest extends AddEmployeeRequest {
  id: string;
}
