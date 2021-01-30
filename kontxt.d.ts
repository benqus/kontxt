export interface Context<T> {
    (): T;
    set(v: T): unknown;
    merge(v: Partial<T>): unknown;
}
export declare const addListener: (fn: Function) => Function;
export declare const removeListener: (fn: Function) => boolean;
export declare function updateContexts(): void;
export declare function createContext<T = unknown>(value?: T): Context<T>;
