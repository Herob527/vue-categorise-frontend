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

export const updateOne = async ({ name, newName }: { name: string; newName: string }) => {
  const { data } = await categoryApi.updateCategoryCategoriesCategoryNamePatch(name, newName);
  return data;
};
export const post = async ({ name }: { name: string }) => {
  const { data } = await categoryApi.postNewCategoryCategoriesPost(name);
  return data;
};
