declare type EventFunc<T> = (data: T) => void;
export default class Event<T = null> {
    private event;
    execute: (data: T) => void;
    executeNull: () => void;
    subscribe: (func: EventFunc<T>) => {
        unSubscribe: () => void;
    };
    allUnsubscribe: () => void;
    once: (func: EventFunc<T>) => void;
    asPromise: (timelimit?: number | undefined) => Promise<T>;
}
export {};
