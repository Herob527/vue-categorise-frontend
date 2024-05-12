export class ProcessingPipeline<T extends any[]> {
  private pipeline: ((value: T[number]) => T[number])[] = [];

  constructor(private values: T) {}

  addStage(stage: (value: T[number]) => T[number], shouldApply: boolean) {
    if (!shouldApply) return this;
    this.pipeline.push(stage);
    return this;
  }

  process(): T[number][] {
    return this.values.map((value) =>
      this.pipeline.reduce((acc, stage) => stage(acc), value),
    );
  }
}
