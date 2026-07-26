import { API_URL } from '@/constants';
import { CategoryApi } from '@/types/generated';

const categories = (() => {
  const api = new CategoryApi(
    {
      isJsonMime: (mime: string) => mime === 'application/json',
    },

    API_URL,
  );

  const getAll = async () => {
    const { data } = await api.getAllCategoriesCategoriesGet();
    return data;
  };

  const deleteOne = async ({ name }: { name: string }) => {
    await api.removeCategoryCategoriesCategoryNameDelete(name);
  };

  const updateOne = async ({
    id,
    newName,
  }: {
    id: string;
    newName: string;
  }) => {
    await api.updateCategoryCategoriesIdPatch(id, newName);
  };
  const post = async ({ name }: { name: string }) => {
    await api.postNewCategoryCategoriesPost(name);
  };
  return { getAll, deleteOne, updateOne, post };
})();

export default categories;
