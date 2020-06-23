declare type EventExecute<T> = (data: T) => void;
declare type EventComplete = () => void;
declare type EventError = (e: any) => void;
export default class Event<T = null> {
    private event;
    execute: (data?: T | undefined) => void;
    complete: () => void;
    error: (e: any) => void;
    allUnsubscribe: () => void;
    subscribe: (execute: EventExecute<T>, complete?: EventComplete | undefined, error?: EventError | undefined) => {
        unSubscribe: () => void;
    };
    once: (execute: EventExecute<T>, complete?: EventComplete | undefined, error?: EventError | undefined) => void;
    asPromise: (timeLimit?: number | undefined) => Promise<T>;
    get returnTrigger(): {
        execute: (data?: T | undefined) => void;
        error: (e: any) => void;
        complete: () => void;
    };
    get returnListener(): {
        subscribe: (execute: EventExecute<T>, complete?: EventComplete | undefined, error?: EventError | undefined) => {
            unSubscribe: () => void;
        };
        once: (execute: EventExecute<T>, complete?: EventComplete | undefined, error?: EventError | undefined) => void;
        asPromise: (timeLimit?: number | undefined) => Promise<T>;
    };
    get length(): number;
}
export {};
