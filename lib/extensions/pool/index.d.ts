import Event from "../../core";
export declare function Pool<T>(length: number, event: Event<T>): {
    subscribe: (func: (data: T) => void) => {
        unSubscribe: () => void;
    };
    asPromise: (timelimit?: number | undefined) => Promise<T>;
    once: (func: (data: T) => void) => void;
};
