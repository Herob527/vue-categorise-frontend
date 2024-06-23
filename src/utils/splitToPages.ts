
export const splitToPages = ({amountOfEntries , selectedPage } = {amountOfEntries: 1, selectedPage: 0}): (number | 'dot')[] => {
  const pages = Array.from(Array(amountOfEntries).keys());
  const firstPage = 0;
  const lastPage = amountOfEntries - 1;
  const usedPage = selectedPage || 0;
  const lowerBound = usedPage - 1 > 0 ? usedPage - 1 : 0;
  const upperBound = usedPage + 2;

  const inBetween = pages.slice(lowerBound, upperBound);
  console.table([
    ['lowerBound', lowerBound],
    ['upperBound', upperBound],
    ['usedPage', usedPage],
  ]);
  if (inBetween[0] === 0) {
    return [0, 'dot', 1, 2, 3, 'dot', lastPage];
  } else if (inBetween[inBetween.length - 1] === pages.length - 1) {
    return [firstPage, 'dot', ...inBetween];
  }
  console.log('inBetween', inBetween);

  return [firstPage, 'dot', ...inBetween, 'dot', lastPage] as const;
};
