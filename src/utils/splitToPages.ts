export const splitToPages = (
  { amountOfEntries = 1, selectedPage = 0, pageSize = 10 } = {
    amountOfEntries: 1,
    selectedPage: 0,
    pageSize: 10,
  },
): (number | 'dot')[] => {
  if (amountOfEntries <= pageSize) {
    return [1];
  }
  const resultPages = [];
  for (let i = 1; i <= Math.ceil(amountOfEntries / pageSize); i++) {
    resultPages.push(i);
  }
  if (selectedPage <= 1) {
    return [0, 1, 2, 'dot', resultPages.at(-1) as number];
  }
  if (selectedPage == 2) {
    return [0, 1, 2, 3, 'dot', resultPages.at(-1) as number];
  }
  if (selectedPage == resultPages.length - 2) {
    return [
      0,
      'dot',
      ...[
        ...(resultPages.slice(resultPages.length - 4, resultPages.length) ||
          []),
      ],
    ];
  }

  if (selectedPage >= resultPages.length - 1) {
    return [
      0,
      'dot',
      ...[
        ...(resultPages.slice(resultPages.length - 3, resultPages.length) ||
          []),
      ],
    ];
  }

  return [
    0,
    'dot',
    ...(resultPages.slice(selectedPage - 2, selectedPage + 1) || []),
    'dot',
    resultPages.at(-1) as number,
  ];
};
