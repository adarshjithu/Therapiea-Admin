'use client'
import { createProduct, deleteProduct, getAllProducts, updateProduct } from '@/api/services/productServices';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export const useGetProducts = (query: any) => {
  return useQuery({ queryKey: ['products', query], queryFn: () => getAllProducts(query) });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (productId: string) => deleteProduct(productId),
    onSuccess: (updatedData: any) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};
export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData) => createProduct(formData),
    onSuccess: (updatedData: any) => {
      toast.success('Product created successfully')
    },
  });
};

export const useChangeProductStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => updateProduct(data?.productId, data.status),
    onSuccess: (response: any) => {
      const updatedProduct = response?.data;

      queryClient.setQueryData(['products'], (oldData: any) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          data: {
            ...oldData.data,
            data: oldData.data.data.map((product: any) =>
              product._id === updatedProduct._id
                ? { ...product, isActive: updatedProduct.isActive } // merge updated fields
                : product,
            ),
          },
        };
      });
    },
  });
};
