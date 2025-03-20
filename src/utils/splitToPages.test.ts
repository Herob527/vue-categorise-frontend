import { describe, expect, test } from 'vitest';
import { splitToPages } from './splitToPages';

const tenPagesAmounts = Array(10)
  .fill(0)
  .map((_, index) => index + 91);

test('Split to pages utility - 309 entries - pageSize 20', () => {
  const pages = splitToPages({
    amountOfEntries: 309,
    selectedPage: 0,
    pageSize: 20,
  });
  expect(pages).toEqual([0, 1, 2, 'dot', 15]);
});
