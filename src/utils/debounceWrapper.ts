export function debounce<Args = unknown, ReturnValue = void>(
  fn: (args: Args) => ReturnValue,
  ms: number,
): [(args: Args) => Promise<ReturnValue>, () => void] {
  let timer: NodeJS.Timeout | undefined;

  const debouncedFunc = (args: Args): Promise<ReturnValue> =>
    new Promise((resolve) => {
      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(() => {
        resolve(fn(args));
      }, ms);
    });

  const teardown = () => {
    clearTimeout(timer);
  };

  return [debouncedFunc, teardown];
}
