export class FilterFactory<T extends any[]> {
  private filterValues: T;
  private filterPredicates: ((value: T) => boolean)[] = [];

  constructor(private entry: T) {
    this.filterValues = entry;
  }
  addFilter(predicate: (value: T[number]) => boolean, shouldApply: boolean) {
    if (!shouldApply) return;
    this.filterPredicates.push(predicate);
  }
  filter(): T[number][] {
    return this.filterValues.filter((value) => {
      // Check if all predicates return true for the current value
      return this.filterPredicates.every((predicate) => predicate(value));
    });
  }
}
