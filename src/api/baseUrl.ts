import axios from "axios";



export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export const errorHandler = (error: any) => {
  if (axios.isAxiosError(error)) {
    const axiosError = error;
    if (axiosError?.response?.data?.message) {
      return axiosError?.response?.data?.message;
    }
  }

  return "An enexpected error occured" as string;
};
