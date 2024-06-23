import { describe, expect, test } from 'vitest';
import { splitToPages } from './splitToPages';

const tenPagesAmounts = Array(10)
  .fill(0)
  .map((_, index) => index + 91);

const elevenPagesAmounts = Array(10)
  .fill(0)
  .map((_, index) => index + 101);

tenPagesAmounts.forEach((amountOfEntries) => {
  describe(`Split to pages utility - ${amountOfEntries} entries - pageSize 10`, () => {
    test('User on 1 page', () => {
      const pages = splitToPages({ amountOfEntries, selectedPage: 0 });
      expect(pages).toEqual([0, 1, 2, 'dot', 10]);
    });

    test('User on 2 page', () => {
      const pages = splitToPages({ amountOfEntries, selectedPage: 1 });
      expect(pages).toEqual([0, 1, 2, 'dot', 10]);
    });

    test('User on 3 page', () => {
      const pages = splitToPages({ amountOfEntries, selectedPage: 2 });
      expect(pages).toEqual([0, 1, 2, 3, 'dot', 10]);
    });
    test('User on 4 page', () => {
      const pages = splitToPages({ amountOfEntries, selectedPage: 3 });
      expect(pages).toEqual([0, 'dot', 2, 3, 4, 'dot', 10]);
    });

    test('User on 8 page', () => {
      const pages = splitToPages({ amountOfEntries, selectedPage: 7 });
      expect(pages).toEqual([0, 'dot', 6, 7, 8, 'dot', 10]);
    });
    test('User on 9 page', () => {
      const pages = splitToPages({ amountOfEntries, selectedPage: 8 });
      expect(pages).toEqual([0, 'dot', 7, 8, 9, 10]);
    });
    test('User on last page', () => {
      const pages = splitToPages({ amountOfEntries, selectedPage: 9 });
      expect(pages).toEqual([0, 'dot', 8, 9, 10]);
    });
  });
});

elevenPagesAmounts.forEach((amountOfEntries) => {
  describe(`Split to pages utility - ${amountOfEntries} entries - pageSize 10`, () => {
    test('User on 1 page', () => {
      const pages = splitToPages({ amountOfEntries, selectedPage: 0 });
      expect(pages).toEqual([0, 1, 2, 'dot', 11]);
    });

    test('User on 2 page', () => {
      const pages = splitToPages({ amountOfEntries, selectedPage: 1 });
      expect(pages).toEqual([0, 1, 2, 'dot', 11]);
    });

    test('User on 3 page', () => {
      const pages = splitToPages({ amountOfEntries, selectedPage: 2 });
      expect(pages).toEqual([0, 1, 2, 3, 'dot', 11]);
    });
    test('User on 4 page', () => {
      const pages = splitToPages({ amountOfEntries, selectedPage: 3 });
      expect(pages).toEqual([0, 'dot', 2, 3, 4, 'dot', 11]);
    });

    test('User on 9 page', () => {
      const pages = splitToPages({ amountOfEntries, selectedPage: 8 });
      expect(pages).toEqual([0, 'dot', 7, 8, 9, 'dot', 11]);
    });
    test('User on 10 page', () => {
      const pages = splitToPages({ amountOfEntries, selectedPage: 9 });
      expect(pages).toEqual([0, 'dot', 8, 9, 10, 11]);
    });
    test('User on last page', () => {
      const pages = splitToPages({ amountOfEntries, selectedPage: 10 });
      expect(pages).toEqual([0, 'dot', 9, 10, 11]);
    });
  });
});
