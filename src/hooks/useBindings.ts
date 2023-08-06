import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import type { AxiosError } from 'axios';
import {
  deleteOne,
  getAll,
  getOne,
  post,
  type UUID,
  type postBindingType,
} from '@/actions/bindings';

const useBindings = () => {
  const queryClient = useQueryClient();

  const usePost = () =>
    useMutation<unknown, AxiosError, postBindingType>({
      mutationFn: async ({ audio, category }) => post({ audio, category }),
      mutationKey: ['postBinding'],
      onError: (err) => {
        return err;
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['getAllBindings']);
      },
    });

  const useDelete = () =>
    useMutation<unknown, AxiosError, { id: UUID }>({
      mutationFn: ({ id }) => deleteOne({ id }),
      onSuccess: (_, { id }) => {
        queryClient.invalidateQueries(['getAllBindings']);
        queryClient.invalidateQueries(['getBinding', id]);
      },
    });

  const useGetAll = () =>
    useQuery({
      queryFn: () => getAll(),
      queryKey: ['getAllBindings'],
    });

  const useGetOne = ({ id }: { id: UUID }) =>
    useQuery({ queryKey: ['getBinding', id], queryFn: () => getOne({ id }) });

  return { usePost, useGetAll, useDelete, useGetOne };
};

export { useBindings };
