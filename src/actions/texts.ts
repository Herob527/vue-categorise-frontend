import { API_URL } from '@/constants';
import { TextsApi } from '@/types/generated';

const texts = (() => {
  const api = new TextsApi(
    {
      isJsonMime: (mime: string) => mime === 'application/json',
    },
    API_URL,
  );

  const updateOne = async ({ id, text }: { id: string; text: string }) => {
    await api.updateTextTextsTextIdPatch(id, text);
  };
  return { updateOne };
})();

export default texts;
