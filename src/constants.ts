import type { Status } from './types/shared';

const API_PORT = '3050';
const API_HOST = 'http://localhost';

export const API_URL = `${API_HOST}:${API_PORT}/api`;

export const STATUS_COLORS: Record<`${Status}`, string> = {
  error: 'red',
  pending: 'yellow',
  processing: 'blue',
  inDatabase: 'orange',
  errorDuplicate: 'blue',
};

export const ENTRIES_PER_PAGE = 10;

export const LOCALSTORAGE_PAGE_KEY = 'lastPage';
