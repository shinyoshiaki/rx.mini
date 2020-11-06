import Event from "../../core";
export declare function Buffer<T extends any[]>(length: number, event: Event<T>): {
    subscribe: (execute: (...args: T) => void, complete?: (() => void) | undefined, error?: ((e: any) => void) | undefined) => {
        unSubscribe: () => void;
    };
    asPromise: (timeLimit?: number | undefined) => Promise<T>;
    once: (execute: (...args: T) => void, complete?: (() => void) | undefined, error?: ((e: any) => void) | undefined) => void;
};
