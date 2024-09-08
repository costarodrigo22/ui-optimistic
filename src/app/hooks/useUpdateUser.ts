import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUser } from '../services/updateUser';
import { USER_QUERY_KEY } from './useUsers';
import { IUser } from '../types/IUsers';

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateUser,
    onMutate: variables => {
      const previousUsers = queryClient.getQueryData<IUser[]>(USER_QUERY_KEY);

      queryClient.setQueryData<IUser[]>(USER_QUERY_KEY, old =>
        old?.map(user =>
          user.id === variables.id ? { ...user, ...variables } : user,
        ),
      );

      return { previousUsers };
    },
    onError: async (_error, _variables, context) => {
      await queryClient.cancelQueries({ queryKey: USER_QUERY_KEY });

      queryClient.setQueryData(USER_QUERY_KEY, context?.previousUsers);
    },
  });
  return {
    updataUser: mutateAsync,
    isLoading: isPending,
  };
}
