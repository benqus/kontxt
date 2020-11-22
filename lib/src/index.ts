import kontxt, { Updater } from './types';

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

export default <T = any>(value: T = null): kontxt<T> => {
  let updaters: Array<Updater<T>> = [];
  const valueUpdater = (fn: Updater<T>): T => value = fn(value);

  contextUpdaters.push(() => {
    updaters.forEach(valueUpdater);
    updaters = [];
  });

  return function (a?: (Updater<T>|T)): T | void {
    if (arguments.length === 0) return value;
    updaters.push(typeof a === 'function' ? a as Updater<T> : (() => a as T));
    scheduleUpdates();
  }
};
