import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import { getAll, deleteOne, updateOne, post } from '@/actions/categories';
import type { AxiosError } from 'axios';

export const useCategories = () => {
  const queryClient = useQueryClient();

  const usePost = () =>
    useMutation<unknown, AxiosError, { id: string; name: string }>({
      mutationFn: async ({ id, name }) => post({ id, name }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['categories'] });
      },
    });
  const useUpdate = () =>
    useMutation<unknown, AxiosError, { id: string; name: string }>({
      mutationFn: async ({ id, name }) => updateOne({ id, name }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['categories'] });
      },
    });
  const useDeleteOne = () =>
    useMutation<unknown, AxiosError, { name: string }>({
      mutationFn: async ({ name }) => deleteOne({ name }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['categories'] });
      },
    });
  const useGetAll = () =>
    useQuery({
      queryKey: ['categories'],
      queryFn: async () => getAll(),
    });

  return { usePost, useUpdate, useDeleteOne, useGetAll };
};
