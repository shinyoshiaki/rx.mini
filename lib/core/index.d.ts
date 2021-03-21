declare type EventExecute<T extends any[]> = (...args: T) => void;
declare type EventComplete = () => void;
declare type EventError = (e: any) => void;
export default class Event<T extends any[]> {
    private event;
    ended: boolean;
    execute: (...args: T) => void;
    complete: () => void;
    error: (e: any) => void;
    allUnsubscribe: () => void;
    subscribe: (execute: EventExecute<T>, complete?: EventComplete | undefined, error?: EventError | undefined) => {
        unSubscribe: () => void;
    };
    once: (execute: EventExecute<T>, complete?: EventComplete | undefined, error?: EventError | undefined) => void;
    watch: (cb: (...args: T) => boolean, timeLimit?: number | undefined) => Promise<T>;
    asPromise: (timeLimit?: number | undefined) => Promise<T>;
    get returnTrigger(): {
        execute: (...args: T) => void;
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
