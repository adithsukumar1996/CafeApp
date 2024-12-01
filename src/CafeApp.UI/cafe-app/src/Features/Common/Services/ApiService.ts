import axios from "axios";

const BASE_URL =
  import.meta.env?.REACT_APP_API_BASE_URL || "https://localhost:7279/api";

export function get<T>(url: `/${string}`): Promise<T> {
  return axios
    .get<T>(BASE_URL + url)
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
      throw error;
    });
}

export function post<T, T1>(url: `/${string}`, data: T1): Promise<T> {
  return axios
    .post<T>(BASE_URL + url, data)
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
      throw error;
    });
}

export function put<T, T1>(url: `/${string}`, data: T1): Promise<T> {
  return axios
    .put<T>(BASE_URL + url, data)
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
      throw error;
    });
}

export function del<T>(url: `/${string}`): Promise<T> {
  return axios
    .delete<T>(BASE_URL + url)
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
      throw error;
    });
}
