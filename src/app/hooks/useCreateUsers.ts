import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "../services/createUser";
import { USER_QUERY_KEY } from "./useUsers";
import { IUser } from "../types/IUsers";

export function useCreateUsers() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createUser,
    onMutate: (variables) => {
      const tmpUserId = String(Math.random());

      queryClient.setQueryData<IUser[]>(USER_QUERY_KEY, (old) =>
        old?.concat({
          ...variables,
          id: tmpUserId,
        })
      );

      return { tmpUserId };
    },
    onSuccess: async (data, _variables, context) => {
      await queryClient.cancelQueries({ queryKey: USER_QUERY_KEY });

      queryClient.setQueryData<IUser[]>(USER_QUERY_KEY, (old) =>
        old?.map((user) => (user.id === context.tmpUserId ? data : user))
      );
    },
    onError: async (_error, _variables, context) => {
      await queryClient.cancelQueries({ queryKey: USER_QUERY_KEY });

      queryClient.setQueryData<IUser[]>(USER_QUERY_KEY, (old) =>
        old?.filter((user) => user.id !== context?.tmpUserId)
      );
    },
  });

  return {
    createUser: mutateAsync,
    isLoading: isPending,
  };
}
