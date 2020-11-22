export type Updater<T> = (v?: T) => T;
export type addListener = Function;
export type removeListener = Function;

type kontxt<T = any> = (a?: Updater<T> | T) => T | void;

export default kontxt;
