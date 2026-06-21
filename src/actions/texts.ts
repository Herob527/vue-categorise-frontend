import { API_URL } from '@/constants';
import { TextsApi } from '@/types/generated';

const textsApi = new TextsApi(
  {
    isJsonMime: (mime: string) => mime === 'application/json',
  },
  API_URL,
);

export const updateOne = async ({ id, text }: { id: string; text: string }) => {
  await textsApi.updateTextTextsTextIdPatch(id, text);
};
