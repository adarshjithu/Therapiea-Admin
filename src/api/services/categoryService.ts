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
export const updateCategory = async (categoryId: string, formData: any) => {
  try {
    const config = formData instanceof FormData
      ? { headers: { 'Content-Type': 'multipart/form-data' } }
      : {};
    
    const res = await axiosInstance.put(`/admin/categories/${categoryId}`, formData, config);
    return res.data;
  } catch (error) {
    const message = errorHandler(error);
    // Don't show toast here - error will be displayed in modal
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
    const res = await axiosInstance.get(`/admin/categories/${categoryId}`);
    return res.data;
  } catch (error) {
    const message = errorHandler(error);
    toast.error(message);
    throw new Error(message);
  }
};
export const createCategory = async (formData: FormData) => {
  try {
    const res = await axiosInstance.post(`/admin/categories`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  } catch (error) {
    const message = errorHandler(error);
    // Don't show toast here - error will be displayed in modal
    throw new Error(message);
  }
};
