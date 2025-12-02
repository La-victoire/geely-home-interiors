import axios, { AxiosRequestConfig } from "axios";
import { User } from "./types";
import { product } from "@/components/shop/Mini-Components/CollectionCard";

const productsApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  headers : {
    "Content-Type":"multipart/form-data",
    "ngrok-skip-browser-warning":"69420"
  },
  withCredentials:true,
});

const profileApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  headers : {
    "Content-Type":"application/json",
    "ngrok-skip-browser-warning":"69420"
  },
  withCredentials: true,
  maxRedirects: 0,
  validateStatus : (status) => status >= 200 && status < 400,
});

// Type for the expected response from this Api
type userApiResponse<T> = {
  userData: User;
  token: string;
  error?: string;
};

type productsApiResponse<T> = {
  products: product[];
  message?: string;
  error?: string;
};

// GET Request from this Api
export const getData = async <T>(endpoint: any, params?: string) => {
  try {
    const response = await productsApi.get<productsApiResponse<T>>(endpoint, {params});
    return response.data;
  } catch (error) {
    handleError(error);
  }
  
};

// POST Request from this Api
export const postData = async <T>(endpoint: string, data:any) => {
  try {
    const response = await productsApi.post<productsApiResponse<T>>(endpoint,data);
    return response.data;

  } catch (error) {
    handleError(error);
  }
};
// PUT Request - Update data
export const editProduct = async <T>(endpoint: string, data: any) => {
  try {
    const response = await productsApi.patch<productsApiResponse<T>>(endpoint, data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// DELETE Request - Remove data
export const deleteProduct = async <T>(endpoint: string) => {
  try {
    const response = await productsApi.delete<productsApiResponse<T>>(endpoint);
    return response.data.message;
  } catch (error) {
    handleError(error);
  }
};

// User Profile related requests

export const getProfile = async <T>(endpoint: string) => {
  try {
    const response = await profileApi.get<userApiResponse<T>>(endpoint);
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

export const createProfile = async <T>(endpoint: string, data:any) => {
  try {
    const response = await profileApi.post<userApiResponse<T>>(endpoint,data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const editProfile = async <T>(endpoint: string, data:any) => {
  try {
    const response = await profileApi.patch<userApiResponse<T>>(endpoint,data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteProfile = async <T>(endpoint: string) => {
  try {
    const response = await profileApi.delete<userApiResponse<T>>(endpoint);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Error handling function
export const handleError = (error: any) => {
  console.error("API Error:", error.response ? error.response.data : error.message);
  throw new Error(error.response?.data?.message || "Something went wrong");
};
