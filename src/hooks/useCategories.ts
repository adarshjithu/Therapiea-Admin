import { getAllCategories } from "@/api/services/categoryService";
import { useQuery } from "@tanstack/react-query";

export const useGetAllCategories = (query: any) => {
    return useQuery({
      queryKey: ['categories', query], // include query so cache is unique
      queryFn: () => getAllCategories(query),

    });
  };
  