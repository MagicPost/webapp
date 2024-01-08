export const promisify = (fn: (onData: Function, onError: Function) => void) =>
  new Promise((resolve, reject) => fn(resolve, reject));
