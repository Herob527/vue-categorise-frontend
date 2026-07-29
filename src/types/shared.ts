export enum Status {
  PENDING = 'pending',
  PROCESSING = 'processing',
  IN_DB = 'inDatabase',
  ERROR = 'error',
  ERROR_DUPLICATE = 'errorDuplicate',
}

export type Entry = {
  id: string;
  duration?: number | null;
  status: Status;
  filename: string;
  file: File;
  category?: string;
};

export interface FileShape {
  fileName: string;
  isDirectory: false;
}

export interface DirectoryShape {
  dirName: string;
  files: (FileShape | DirectoryShape)[];
  isDirectory: true;
  categoryId: string;
}

export type DataProp = FileShape | DirectoryShape;
