import { 
  getAllCategories, 
  getCategoryById, 
  createCategory, 
  updateCategory, 
  deleteCategory 
} from "@/api/services/categoryService";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useGetAllCategories = (query: any) => {
  return useQuery({
    queryKey: ['categories', query],
    queryFn: () => getAllCategories(query),
  });
};

export const useGetCategoryById = (categoryId: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['category', categoryId],
    queryFn: () => getCategoryById(categoryId),
    enabled: enabled && !!categoryId,
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Category created successfully!');
    },
    // Remove onError here - error will be handled in modal
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ categoryId, formData }: { categoryId: string, formData: any }) => 
      updateCategory(categoryId, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Category updated successfully!');
    },
    // Remove onError here - error will be handled in modal
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Category deleted successfully!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to delete category');
    }
  });
};
