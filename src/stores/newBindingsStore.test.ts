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

    store.removeFile('test');

    expect(store.getAll.length).toBe(0);
    expect(store.getFieldsByStatus(Statuses.PENDING, 0).length).toBe(0);
  });
  test('Update status', () => {
    const store = useBindingsStoreV2();
    store.addFile({
      id: 'test',
      duration: 5,
      file: new File([], 'Test'),
      status: Statuses.PENDING,
      page: 0,
    });
    store.updateStatus('test', Statuses.IN_DB);

    expect(store.getFieldsByStatus(Statuses.PENDING).length).toBe(0);
    expect(store.getFieldsByStatus(Statuses.IN_DB).length).toBe(1);
  });
  test('Update file data', () => {
    const store = useBindingsStoreV2();
    store.addFile({
      id: 'test',
      duration: 5,
      file: new File([], 'Test'),
      status: Statuses.PENDING,
      page: 0,
    });
    store.updateFileData('test', { duration: 10 });
    expect(store.getFieldById('test').value?.duration).toBe(10);
  });
});
