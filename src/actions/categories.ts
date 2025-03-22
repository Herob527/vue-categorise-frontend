import { API_URL } from '@/constants';
import { CategoryApi } from '@/types/generated';

const categoryApi = new CategoryApi(
  {
    isJsonMime: (mime: string) => mime === 'application/json',
  },

  API_URL,
);

export const getAll = async () => {
  const { data } = await categoryApi.getAllCategoriesCategoriesGet();
  return data;
};

export const deleteOne = async ({ name }: { name: string }) => {
  const { data } =
    await categoryApi.removeCategoryCategoriesCategoryNameDelete(name);
  return data;
};

export const updateOne = async ({ id, newName }: { id: string; newName: string }) => {
  const { data } = await categoryApi.updateCategoryCategoriesIdPatch(id, newName);
  return data;
};
export const post = async ({ name }: { name: string }) => {
  const { data } = await categoryApi.postNewCategoryCategoriesPost(null, name);
  return data;
};
