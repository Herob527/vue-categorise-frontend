import type { statuses } from './types/shared';

const API_PORT = '3051';
const API_HOST = 'http://localhost';

export const API_URL = `${API_HOST}:${API_PORT}`;

export const STATUS_COLORS: Record<`${statuses}`, string> = {
  error: 'red',
  pending: 'yellow',
  processing: 'blue',
  inDatabase: 'orange',
};

export const ENTRIES_PER_PAGE = 10;

export const LOCALSTORAGE_PAGE_KEY = 'lastPage';
