import { axiosApi } from '@/axiosConfig';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
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

  return { usePostBinding };
};

export { useBindings };
