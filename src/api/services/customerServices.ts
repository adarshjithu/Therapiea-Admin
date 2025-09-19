
import { axiosInstance, errorHandler } from "../baseUrl";
import toast from "react-hot-toast";

export const getAllCustomers = async (query: any) => {
  try {
    const res = await axiosInstance.get("/admin/customers", { params: query });
    return res.data;
  } catch (error) {
    const message = errorHandler(error);
    toast.error(message);
    throw new Error(message);
  }
};

export const updateCustomerStatus = async (customerId: string) => {
  try {
    const res = await axiosInstance.patch(`/admin/customers/${customerId}/status`);
    return res.data;
  } catch (error) {
    const message = errorHandler(error);
    toast.error(message);
    throw new Error(message);
  }
};
export const blockUser = async (customerId: string) => {
  try {
    const res = await axiosInstance.patch(`/admin/customers/${customerId}/block`);
    return res.data;
  } catch (error) {
    const message = errorHandler(error);
    toast.error(message);
    throw new Error(message);
  }
};
export const deleteUser = async (customerId: string) => {
  try {
    const res = await axiosInstance.delete(`/admin/customers/${customerId}`);
    return res.data;
  } catch (error) {
    const message = errorHandler(error);
    toast.error(message);
    throw new Error(message);
  }
};
