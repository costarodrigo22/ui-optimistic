import { useQuery } from "@tanstack/react-query";
import { listUsers } from "../services/listUsers";
import { IUser } from "../types/IUsers";
import { withStatus } from "../types/utils";

export const USER_QUERY_KEY = ["users"];

export type UsersQueryData = withStatus<IUser>[];

export function useUsers() {
  const { data, isLoading } = useQuery({
    queryKey: USER_QUERY_KEY,
    queryFn: async () => {
      const users = await listUsers();

      return users as UsersQueryData;
    },
  });

  return { users: data ?? [], isLoading };
}
