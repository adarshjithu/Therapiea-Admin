import { getAllReviews } from "@/api/services/reviewService"
import { useQuery } from "@tanstack/react-query"

export const useGetReviews = (query:any)=>{
    return useQuery({queryKey:['reviews',query],queryFn:()=>getAllReviews(query)})
}