export type Updater<T> = (v?: T) => T;
export type Context<T> = (a?: Updater<T> | T) => T | void;
export type addListener = Function;
export type removeListener = Function;

type ContextBuilder = <T = any>(value?: T) => Context<T>;

export default ContextBuilder;