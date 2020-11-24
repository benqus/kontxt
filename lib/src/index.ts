import { Context, Updater } from './types';
export * from './types';

let tout: NodeJS.Timeout = null;
const execFn = (fn: Function): void => fn();

const listeners: Set<Function> = new Set();
export const addListener = (fn: Function): Function => listeners.add(fn) && fn;
export const removeListener = (fn: Function): boolean => listeners.delete(fn);

function execListeners(): void {
  clearTimeout(tout);
  tout = null;
  listeners.forEach(execFn);
}

export function createContext<T = unknown>(value: T = null): Context<T> {
  return function (a?: Updater<T> | T): T | void {
    if (arguments.length === 0) return value;
    value = (typeof a === 'function' ? (a as Updater<T>)(value) : a);
    tout = tout ?? setTimeout(execListeners, 0);
  }
}

export default { createContext, addListener, removeListener };
