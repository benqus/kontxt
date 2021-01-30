export interface Context<T> {
  (): T;
  set(v: T): unknown;
  merge(v: Partial<T>): unknown;
}

const listeners: Set<Function> = new Set();
const execFn = (fn: Function): void => fn();
let tout: NodeJS.Timeout = null;

export const addListener = (fn: Function): Function => listeners.add(fn) && fn;
export const removeListener = (fn: Function): boolean => listeners.delete(fn);
export function updateContexts(): void {
  clearTimeout(tout);
  tout = null;
  listeners.forEach(execFn);
}

export function createContext<T = unknown>(value: T = null): Context<T> {
  const context = (): T => value;
  context.set = (v: T) => {
    value = v;
    tout = tout ?? setTimeout(updateContexts, 0);
  };
  context.merge = (v: Partial<T>) => context.set({ ...value, ...v });
  return context;
}
