import { deleteProduct, getAllProducts, updateProduct } from '@/api/services/productServices';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useGetProducts = (query: any) => {
  return useQuery({ queryKey: ['products', query], queryFn: () => getAllProducts(query) });
};

export const useDeleteProduct = () => {
  return useMutation({
    mutationFn: (productId: string) => deleteProduct(productId),
    onSuccess: (updatedData: any) => {
      console.log(updatedData, 'p');
    },
  });
};


export const useChangeProductStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => updateProduct(data?.productId, data.status),
    onSuccess: (response: any) => {
      const updatedProduct = response?.data;

      queryClient.setQueriesData(
        { queryKey: ['products'] },
        (oldData: any) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            data: {
              ...oldData.data,
              data: oldData.data.data.map((product: any) =>
                product._id === updatedProduct._id
                  ? { ...product,isActive:updatedProduct.isActive } // merge updated fields
                  : product
              ),
            },
          };
        }
      );
    },
  });
};

