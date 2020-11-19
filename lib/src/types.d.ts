export interface Context<T> {
  (): T;
  set(fn: (v: T) => T): void;
}
