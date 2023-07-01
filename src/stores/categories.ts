import { axiosApi } from '@/axiosConfig';
import { useMutation, useQuery } from '@tanstack/vue-query';
import { defineStore } from 'pinia';
import { v4 } from 'uuid';

const addCategory = async (name: string) => {
  const id = v4();
  const res = await axiosApi.post('categories', {
    body: JSON.stringify({ id, category: name }),
  });
  return res.data;
};

const getAllCategories = async () => {
  const res = await axiosApi.get('categories');
  return res.data;
};

const updateCategory = async (name: string, newName: string) => {
  const res = await axiosApi.patch(`categories/${name}`, {
    body: JSON.stringify({ new_category_name: 'newName' }),
  });
  return res.data;
};

const removeCategory = async (name: string) => {
  const res = await axiosApi.delete(`categories/${name}`);
  return res.data;
};
export const useCategoriesStore = defineStore('categories', () => {
  const useAddCategory = (name: string) => {
    const { data, isLoading, isSuccess, isError } = useMutation({
      mutationKey: ['addCategory'],
      mutationFn: async () => await addCategory(name),
    });
    return { data, isLoading, isSuccess, isError };
  };
  const useGetAllCategories = () => {
    const { data, isLoading, isSuccess, isError } = useQuery({
      queryKey: ['categories'],
      queryFn: getAllCategories,
    });
    return { data, isLoading, isSuccess, isError };
  };
  return {
    useAddCategory,
    useGetAllCategories,
  };
});
