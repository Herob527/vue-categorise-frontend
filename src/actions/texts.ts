import { TextsApi } from '@/types/generated';

const textsApi = new TextsApi(
  {
    isJsonMime: (mime: string) => mime === 'application/json',
  },
  'http://localhost:8000',
);

export const getOne = async (id: string) => {
  const { data } = await textsApi.getTextTextsTextIdGet(id);
  return data;
};

export const updateOne = async ({ id, text }: { id: string; text: string }) => {
  console.log('[updateOne - id,text]', id, text);
  const { data } = await textsApi.updateTextTextsTextIdPatch(id, text);
  return data;
};
