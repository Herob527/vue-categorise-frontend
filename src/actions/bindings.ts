import { axiosApi } from '@/axiosConfig';
import { BindingsApi } from '@/types/generated';

const bindingsApi = new BindingsApi(
  {
    isJsonMime: (mime: string) => mime === 'application/json',
  },
  'http://localhost:8000',
);

export type postBindingType = {
  audio: File;
  category?: string;
};

export type UUID = string;

export const post = async ({ audio, category }: postBindingType) => {
  const { data } = await bindingsApi.createBindingBindingsPost(audio, category);
  return data;
};

export const getAll = async () => {
  const { data } = await bindingsApi.getAllBindingsBindingsAllGet();
  return data;
};

export const getPaginated = async ({
  page,
  pageSize,
}: {
  page: number;
  pageSize: number;
}) => {
  const { data } = await bindingsApi.getPaginatedBindingsBindingsGet(
    page,
    pageSize,
  );
  return data;
};

export const getOne = async ({ id }: { id: UUID }) => {
  const res = await axiosApi.get(`bindings/${id}`);
  return res.data;
};

export const deleteOne = async ({ id }: { id: UUID }) => {
  const res = await axiosApi.delete(`bindings/${id}`);
  return res.data;
};

export const getCount = async () => {
  const { data } = await bindingsApi.getCountBindingsCountGet();
  return data as number;
};

export const updateOneCategory = async ({
  bindingId,
  categoryId,
}: {
  bindingId: UUID;
  categoryId: string;
}) => {
  const res =
    await bindingsApi.bindingCategoryUpdateBindingsBindingIdCategoryAssignCategoryIdPut(
      bindingId,
      categoryId,
    );
  return res;
};

export const removeCategoryFromBinding = async (bindingId: UUID) => {
  const { data } =
    await bindingsApi.bindingCategoryRemoveBindingsBindingIdRemoveCategoryPut(
      bindingId,
    );
  return data;
};
