export interface AddEmployeeRequest {
  name: string;
  email: string;
  phoneNumber: string;
  gender: string;
  assignedCafe: string;
}

export const defaultAddEmployeeRequest: AddEmployeeRequest = {
  name: "",
  email: "",
  phoneNumber: "",
  gender: "",
  assignedCafe: "",
};
