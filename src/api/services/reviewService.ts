import { axiosInstance, errorHandler } from '../baseUrl';
import toast from 'react-hot-toast';

export const getAllReviews = async (query: any) => {
  try {
    const res = await axiosInstance.get('/admin/reviews', { params: query });
    return res.data;
  } catch (error) {
    const message = errorHandler(error);
    toast.error(message);
    throw new Error(message);
  }
};
export const deleteReview = async (reviewId:string) => {
  try {
    const res = await axiosInstance.get(`/admin/reviews/${reviewId}`);
    return res.data;
  } catch (error) {
    const message = errorHandler(error);
    toast.error(message);
    throw new Error(message);
  }
};
export const blockReview = async (reviewId:string) => {
  try {
    const res = await axiosInstance.get(`/admin/reviews/${reviewId}`);
    return res.data;
  } catch (error) {
    const message = errorHandler(error);
    toast.error(message);
    throw new Error(message);
  }
};
