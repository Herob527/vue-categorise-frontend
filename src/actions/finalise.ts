import {
  FinaliseApi,
  type FileModel,
  type FinaliseConfigModel,
} from '@/types/generated';

const finaliseApi = new FinaliseApi(
  {
    isJsonMime: (mime: string) => mime === 'application/json',
  },
  'http://localhost:8000',
);

type DirectoryShape = {
  dir_name: string;
  files: (FileModel | DirectoryShape)[];
  is_dir: true;
};

export type DataProp = FileModel | DirectoryShape;

export const post = async (params: FinaliseConfigModel = {}) => {
  const { data } = await finaliseApi.finaliseFinalisePost(params);

  // Necessary for proper recursive typing
  return data as unknown as DataProp;
};
