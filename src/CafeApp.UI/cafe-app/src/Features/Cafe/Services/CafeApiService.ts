import { del, get, post, put } from "../../Common/Services/ApiService";
import { BaseCommandResponse } from "../../Common/Models/BaseCommandResponse";
import { AddCafeRequest } from "../Models/AddCafeRequest";
import { EditCafeRequest } from "../Models/EditCafeRequest";
import { GetCafeResponse } from "../Models/GetCafeResponse";

export const getCafeListResponse = (
  location?: string
): Promise<Array<GetCafeResponse>> =>
  get<Array<GetCafeResponse>>(`/cafe?location=${location}`);

export const getCafeById = (id: string): Promise<GetCafeResponse> =>
  get<GetCafeResponse>(`/cafe/${id}`);

export const addCafe = (data: AddCafeRequest): Promise<BaseCommandResponse> =>
  post<BaseCommandResponse, AddCafeRequest>(`/cafe`, data);

export const editCafe = (data: EditCafeRequest): Promise<BaseCommandResponse> =>
  put<BaseCommandResponse, EditCafeRequest>(`/cafe`, data);

export const deleteCafe = (id: string): Promise<BaseCommandResponse> =>
  del<BaseCommandResponse>(`/cafe/${id}`);
