import { useQuery } from "@tanstack/react-query";
import { listUsers } from "../services/listUsers";

export const USER_QUERY_KEY = ["users"];

export function useUsers() {
  const { data, isLoading } = useQuery({
    queryKey: USER_QUERY_KEY,
    queryFn: listUsers,
  });

  return { users: data ?? [], isLoading };
}
