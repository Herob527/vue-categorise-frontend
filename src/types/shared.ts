export enum statuses {
  PENDING = 'pending',
  PROCESSING = 'processing',
  IN_DB = 'inDatabase',
  ERROR = 'error',
}

export type Entry = {
  id: string;
  duration?: number | null;
  status: statuses;
  filename: string;
  file: File;
};

export type FileShape = {
  fileName: string;
  isDirectory: false;
};

export type DirectoryShape = {
  dirName: string;
  files: FileShape[];
  isDirectory: true;
};

export type DataProp = FileShape | DirectoryShape;
