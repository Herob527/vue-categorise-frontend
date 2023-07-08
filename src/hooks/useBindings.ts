import { axiosApi } from '@/axiosConfig';
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import type { AxiosError } from 'axios';

type postBindingType = {
  audio: File;
  category: string;
};

const postBinding = async ({ audio, category }: postBindingType) => {
  const formData = new FormData();
  formData.set('audio', audio);
  formData.set('category', category);
  const res = await axiosApi.postForm('bindings', formData);
  return res.data;
};

const getAllBindings = async () => {
  const res = await axiosApi.get('bindings/all');
  console.log(res.data);
  return res.data;
};

const useBindings = () => {
  const queryClient = useQueryClient();

  const usePostBinding = () =>
    useMutation<unknown, AxiosError, postBindingType>({
      mutationFn: ({ audio, category }) => postBinding({ audio, category }),
      mutationKey: ['postBinding'],
      onError: (err) => {
        return err;
      },
    });
  const useGetAllBindings = () =>
    useQuery({
      queryFn: () => getAllBindings(),
      queryKey: ['getAllBindings'],
    });
  return { usePostBinding, useGetAllBindings };
};

export { useBindings };
