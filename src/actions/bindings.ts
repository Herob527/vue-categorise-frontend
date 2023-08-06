import { axiosApi } from '@/axiosConfig';

export type postBindingType = {
  audio: File;
  category: string;
};

export type UUID = string;

export const post = async ({ audio, category }: postBindingType) => {
  const formData = new FormData();
  formData.set('audio', audio);
  formData.set('category', category);
  const res = await axiosApi.postForm('bindings', formData);
  return res.data;
};

export const getAll = async () => {
  const res = await axiosApi.get('bindings/all');
  return res.data;
};

export const getPaginated = async ({
  page,
  pageSize,
}: {
  page: number;
  pageSize: number;
}) => {
  const res = await axiosApi.get(`bindings?page=${page}&per_page=${pageSize}`);
  return res.data;
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
  const res = await axiosApi.get('bindings/count');
  return res.data;
};
