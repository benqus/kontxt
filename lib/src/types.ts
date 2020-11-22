export type Updater<T> = (v?: T) => T;
export type Context<T> = (a?: Updater<T> | T) => T | void;
