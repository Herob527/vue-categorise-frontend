// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class FilterFactory<T extends any[]> {
  private filterPredicates: ((value: T[number]) => boolean)[] = [];

  constructor(private filterValues: T) {}

  addFilter(predicate: (value: T[number]) => boolean, shouldApply: boolean) {
    if (!shouldApply) return this;
    this.filterPredicates.push(predicate);
    return this;
  }

  filter(): T[number][] {
    return this.filterValues.filter((value) =>
      this.filterPredicates.every((predicate) => predicate(value)),
    );
  }
}
