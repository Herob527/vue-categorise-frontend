import { API_URL } from '@/constants';
import { BindingsApi } from '@/types/generated';

type UUID = string;

const bindings = (() => {
  const api = new BindingsApi(
    {
      isJsonMime: (mime: string) => mime === 'application/json',
    },
    API_URL,
  );

  type postBindingType = {
    audio: File;
    category?: string;
  };

  const post = async ({ audio, category }: postBindingType) => {
    const { data } = await api.createBindingBindingsPost(audio, category);
    return data;
  };

  const getPaginated = async ({
    page,
    pageSize,
  }: {
    page: number;
    pageSize: number;
  }) => {
    const { data } = await api.getPaginatedBindingsBindingsGet(page, pageSize);
    return data;
  };

  const deleteOne = async ({ id }: { id: UUID }) => {
    const res = await api.removeBindingBindingsBindingIdDelete(id);
    return res;
  };

  const updateOneCategory = async ({
    bindingId,
    categoryId,
  }: {
    bindingId: UUID;
    categoryId: string;
  }) => {
    const res =
      await api.bindingCategoryUpdateBindingsBindingIdCategoryAssignCategoryIdPut(
        bindingId,
        categoryId,
      );
    return res;
  };

  const removeCategoryFromBinding = async (bindingId: UUID) => {
    await api.bindingCategoryRemoveBindingsBindingIdRemoveCategoryPut(
      bindingId,
    );
  };
  return {
    post,
    getPaginated,
    deleteOne,
    updateOneCategory,
    removeCategoryFromBinding,
  };
})();

export default bindings;
