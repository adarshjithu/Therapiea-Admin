import { axiosInstance, errorHandler } from '../baseUrl';
import toast from 'react-hot-toast';

export const getAllCategories = async (query: any) => {
  try {
    const res = await axiosInstance.get('/admin/categories', { params: query });
    return res.data;
  } catch (error) {
    const message = errorHandler(error);
    toast.error(message);
    throw new Error(message);
  }
};
export const updateCategory = async (categoryId: string, formData: string) => {
  try {
    const res = await axiosInstance.put(`/admin/categories/${categoryId}`, formData);
    return res.data;
  } catch (error) {
    const message = errorHandler(error);
    toast.error(message);
    throw new Error(message);
  }
};
export const deleteCategory = async (categoryId: string) => {
  try {
    const res = await axiosInstance.delete(`/admin/categories/${categoryId}`);
    return res.data;
  } catch (error) {
    const message = errorHandler(error);
    toast.error(message);
    throw new Error(message);
  }
};
export const getCategoryById = async (categoryId: string) => {
  try {
    const res = await axiosInstance.delete(`/admin/categories/${categoryId}`);
    return res.data;
  } catch (error) {
    const message = errorHandler(error);
    toast.error(message);
    throw new Error(message);
  }
};
export const createCategory = async (formData:any) => {
  try {
    const res = await axiosInstance.post(`/admin/categories`,formData);
    return res.data;
  } catch (error) {
    const message = errorHandler(error);
    toast.error(message);
    throw new Error(message);
  }
};
