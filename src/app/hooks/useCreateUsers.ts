import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createUser } from '../services/createUser';
import { USER_QUERY_KEY, UsersQueryData } from './useUsers';

export function useCreateUsers() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createUser,
    onMutate: variables => {
      const tmpUserId = String(Math.random());

      queryClient.setQueryData<UsersQueryData>(USER_QUERY_KEY, old =>
        old?.concat({
          ...variables,
          id: tmpUserId,
          status: 'pending',
        }),
      );

      return { tmpUserId };
    },
    onSuccess: async (data, _variables, context) => {
      await queryClient.cancelQueries({ queryKey: USER_QUERY_KEY });

      queryClient.setQueryData<UsersQueryData>(USER_QUERY_KEY, old =>
        old?.map(user =>
          user.id === context.tmpUserId ? { ...data, status: 'success' } : user,
        ),
      );
    },
    onError: async (_error, _variables, context) => {
      await queryClient.cancelQueries({ queryKey: USER_QUERY_KEY });

      queryClient.setQueryData<UsersQueryData>(USER_QUERY_KEY, old =>
        old?.map(user =>
          user.id === context?.tmpUserId ? { ...user, status: 'error' } : user,
        ),
      );
    },
  });

  return {
    createUser: mutateAsync,
    isLoading: isPending,
  };
}
