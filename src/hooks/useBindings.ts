import { axiosApi } from '@/axiosConfig';
import { useMutation, useQueryClient } from '@tanstack/vue-query';

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
    useMutation({
      mutationFn: ({ audio, category }: postBindingType) =>
        postBinding({ audio, category }),
      mutationKey: ['postBinding'],
    });

  return { usePostBinding };
};

export { useBindings };
