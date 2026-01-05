import { useQuery } from "@tanstack/react-query";
import { userApi } from "../lib/api";


export const useUserById = (id: string) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => userApi.getById(id),
    enabled: !!id
  });
};
