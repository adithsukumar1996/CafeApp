import { del, get, post, put } from "../../Common/Services/ApiService";
import { BaseCommandResponse } from "../../Common/Models/BaseCommandResponse";
import { AddEmployeeRequest } from "../Models/AddEmployeeRequest";
import { EditEmployeeRequest } from "../Models/EditEmployeeRequest";
import { GetEmployeeResponse } from "../Models/GetEmployeeResponse";

export const getEmployeeResponse = (
  cafe?: string
): Promise<Array<GetEmployeeResponse>> =>
  get<Array<GetEmployeeResponse>>(`/employee?cafe=${cafe}`);

export const getEmployeeById = (id: string): Promise<GetEmployeeResponse> =>
  get<GetEmployeeResponse>(`/employee/${id}`);

export const addEmployee = (
  data: AddEmployeeRequest
): Promise<BaseCommandResponse> =>
  post<BaseCommandResponse, AddEmployeeRequest>(`/employee`, data);

export const editEmployee = (
  data: EditEmployeeRequest
): Promise<BaseCommandResponse> =>
  put<BaseCommandResponse, EditEmployeeRequest>(`/employee`, data);

export const deleteEmployee = (id: string): Promise<BaseCommandResponse> =>
  del<BaseCommandResponse>(`/employee/${id}`);
