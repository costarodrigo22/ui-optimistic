import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../services/updateUser";
import { USER_QUERY_KEY } from "./useUsers";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: USER_QUERY_KEY,
      });
    },
  });
  return {
    updataUser: mutateAsync,
    isLoading: isPending,
  };
}
