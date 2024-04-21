import { axiosApi } from '@/axiosConfig';
import { CategoryApi } from '@/types/generated';

const categoryApi = new CategoryApi(
  {
    isJsonMime: (mime: string) => mime === 'application/json',
  },
  'http://localhost:8000',
);

export const getAll = async () => {
  const { data } = await categoryApi.getAllCategoriesCategoriesGet();
  return data;
};

export const deleteOne = async ({ name }: { name: string }) => {
  const res = await axiosApi.delete(`categories/${name}`);
  return res.data;
};

export const updateOne = async ({ id, name }: { id: string; name: string }) => {
  const formData = new FormData();
  formData.set('new_category_name', name);
  const res = await axiosApi.patch(`categories/${id}`, formData);
  return res.data;
};
export const post = async ({ id, name }: { id: string; name: string }) => {
  const { data } = await categoryApi.postNewCategoryCategoriesPost(id, name);
  return data;
};
