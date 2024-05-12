export class FilterFactory<T extends any[]> {
  private filterPredicates: ((value: T) => boolean)[] = [];

  constructor(private filterValues: T) {}

  addFilter(predicate: (value: T[number]) => boolean, shouldApply: boolean) {
    if (!shouldApply) return this;
    this.filterPredicates.push(predicate);
    return this;
  }

  filter(): T[number][] {
    return this.filterValues.filter((value) => {
      // Check if all predicates return true for the current value
      return this.filterPredicates.every((predicate) => predicate(value));
    });
  }
}
