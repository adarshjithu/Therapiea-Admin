import toast from 'react-hot-toast';
import { axiosInstance, errorHandler } from '../baseUrl';

export const getAllProducts = async (query: any) => {
  try {
    const res = await axiosInstance.get(`/admin/products`, { params: query });
    return res.data;
  } catch (error) {
    const message = errorHandler(error);
    toast.error(message);
    throw new Error(message);
  }
};
export const deleteProduct = async (productId: string) => {
  try {
    const res = await axiosInstance.delete(`/admin/products/${productId}`);
    return res.data;
  } catch (error) {
    const message = errorHandler(error);
    toast.error(message);
    throw new Error(message);
  }
};
export const updateProduct = async (productId: string, formData: any) => {
  try {
    const res = await axiosInstance.put(`/admin/products/${productId}`, { isActive: formData });
    return res.data;
  } catch (error) {
    const message = errorHandler(error);
    toast.error(message);
    throw new Error(message);
  }
};
export const createProduct = async ( formData: any) => {
  try {
    
    const res = await axiosInstance.post(`/admin/products`,formData,{headers:{"Content-Type":"multipart/form-data"}});
    return res.data;
  } catch (error) {
    const message = errorHandler(error);
    toast.error(message);
    throw new Error(message);
  }
};
