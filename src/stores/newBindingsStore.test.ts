import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, test } from 'vitest';
import { Statuses, useBindingsStoreV2 } from './newBindingsStore';

describe('New bindings Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test('Add new local file', () => {
    const store = useBindingsStoreV2();
    store.addFile({
      id: 'test',
      duration: 5,
      file: new File([], 'Test'),
      status: Statuses.PENDING,
      page: 0,
    });
    expect(store.getAll.length).toBe(1);
    expect(store.getFieldsByStatus(Statuses.PENDING, 0).length).toBe(1);
  });
  test('Remove file', () => {
    const store = useBindingsStoreV2();
    store.addFile({
      id: 'test',
      duration: 5,
      file: new File([], 'Test'),
      status: Statuses.PENDING,
      page: 0,
    });

    store.removeFile(Statuses.PENDING, 'test');

    expect(store.getAll.length).toBe(0);
    expect(store.getFieldsByStatus(Statuses.PENDING, 0).length).toBe(0);
  });
});
