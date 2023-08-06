import { axiosApi } from '@/axiosConfig';

export const getAll = async () => {
  const res = await axiosApi.get('categories');
  return res.data;
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
  const formData = new FormData();
  formData.set('id', id);
  formData.set('category', name);
  const res = await axiosApi.post('categories', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};
