import {blockUser,deleteUser,getAllCustomers,updateCustomerStatus,} from "@/api/services/customerServices";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Get all customers
export const useGetAllCustomers = (query: any) => {
  return useQuery({
    queryKey: ["customers", query],
    queryFn: () => getAllCustomers(query),
  });
};

// Change active status
export const useChangeCustomerStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (customerId: string) => updateCustomerStatus(customerId),
    onSuccess: (updatedCustomer) => {
      queryClient.setQueriesData(
        { queryKey: ["customers"] },
        (oldData: any) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            data: {
              ...oldData.data,
              customers: oldData.data.customers.map((customer: any) =>
                customer._id === updatedCustomer?.data?._id
                  ? { ...customer, ...updatedCustomer.data } // merge new data
                  : customer,
              ),
            },
          };
        },
      );
    },
  });
};

// Block user
export const useBlockUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (customerId: string) => blockUser(customerId),
    onSuccess: (updatedCustomer) => {
      queryClient.setQueriesData(
        { queryKey: ["customers"] },
        (oldData: any) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            data: {
              ...oldData.data,
              customers: oldData.data.customers.map((customer: any) =>
                customer._id === updatedCustomer?.data?._id
                  ? { ...customer, ...updatedCustomer.data }
                  : customer,
              ),
            },
          };
        },
      );
    },
  });
};

// Delete User
export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (customerId: string) => deleteUser(customerId),

    onSuccess: (_response, customerId) => {
      queryClient.setQueriesData(
        { queryKey: ["customers"] },
        (oldData: any) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            data: {
              ...oldData.data,
              customers: oldData.data.customers.filter(
                (customer: any) => customer._id !== customerId, // remove deleted user
              ),
            },
          };
        },
      );
    },
  });
};
