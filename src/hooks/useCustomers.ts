import {
  getAllCustomers,
  updateCustomerStatus,
} from "@/api/services/customerServices";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetAllCustomers = (query: any) => {
  return useQuery({
    queryKey: ["customers", query],
    queryFn: () => getAllCustomers(query),
  });
};

export const useChangeCustomerStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (customerId:string) => updateCustomerStatus(customerId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });
};
