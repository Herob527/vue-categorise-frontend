import { expect, test } from 'vitest';
import { splitToPages } from './splitToPages';

test('Split to pages utility - 309 entries - pageSize 20', () => {
  const pages = splitToPages({
    amountOfEntries: 309,
    selectedPage: 0,
    pageSize: 20,
  });
  expect(pages).toEqual([0, 1, 2, 'dot', 15]);
});

test('Split to pages utility - 300 entries - pageSize 20', () => {
  const pages = splitToPages({
    amountOfEntries: 300,
    selectedPage: 0,
    pageSize: 20,
  });
  expect(pages).toEqual([0, 1, 2, 'dot', 15]);
});

test('Split to pages utility - 299 entries - pageSize 20', () => {
  const pages = splitToPages({
    amountOfEntries: 299,
    selectedPage: 0,
    pageSize: 20,
  });
  expect(pages).toEqual([0, 1, 2, 'dot', 14]);
});
