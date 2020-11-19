export interface Context<T> {
  (): T;
  set(fn: (v: T) => T): void;
}

let tout: NodeJS.Timeout = null;
const scheduleUpdates = () => tout = tout ?? setTimeout(updateContexts, 0);
const fnExecutor = (fn: Function): void => fn();

const listeners: Set<Function> = new Set();
export const addListener = (fn: Function): Function => listeners.add(fn) && fn;
export const removeListener = (fn: Function): boolean => listeners.delete(fn);

const contextUpdaters: Array<Function> = [];
function updateContexts(): void {
  clearTimeout(tout);
  tout = null;
  contextUpdaters.forEach(fnExecutor);
  listeners.forEach(fnExecutor);
}

export default <T = any>(value: T = null): Context<T> => {
  let updaters: Array<Function> = [];
  const valueUpdater = (fn: Function): T => value = fn(value);

  contextUpdaters.push((): void => {
    updaters.forEach(valueUpdater);
    updaters = [];
  });

  function Getter(): T { return value; }

  Getter.set = (fn: (v: T) => T): void => {
    updaters.push(fn);
    scheduleUpdates();
  };

  return Getter;
};
