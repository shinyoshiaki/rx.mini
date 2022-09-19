type EventExecute<T extends any[]> = (...args: T) => void;
type EventComplete = () => void;
type EventError = (e: any) => void;

type IEvent<T extends any[]> = {
  stack: {
    execute: EventExecute<T>;
    complete?: EventComplete;
    error?: EventError;
    id: number;
  }[];
  index: number;
};

export default class Event<T extends any[]> {
  private event: IEvent<T> = { stack: [], index: 0 };
  ended = false;

  execute = (...args: T) => {
    if (this.ended) throw new Error("event completed");

    for (let item of this.event.stack) {
      item.execute(...args);
    }
  };

  complete = () => {
    if (this.ended) throw new Error("event completed");

    for (let item of this.event.stack) {
      if (item.complete) item.complete();
    }
    this.allUnsubscribe();
    this.ended = true;
  };

  error = (e: any) => {
    if (this.ended) throw new Error("event completed");

    for (let item of this.event.stack) {
      if (item.error) item.error(e);
    }
    this.allUnsubscribe();
  };

  allUnsubscribe = () => {
    if (this.ended) throw new Error("event completed");

    this.event = { stack: [], index: 0 };
  };

  subscribe = (
    execute: EventExecute<T>,
    complete?: EventComplete,
    error?: EventError
  ) => {
    if (this.ended) throw new Error("event completed");

    const id = this.event.index;
    this.event.stack.push({ execute, id, complete, error });
    this.event.index++;
    const unSubscribe = () => {
      this.event.stack = this.event.stack.filter(
        (item) => item.id !== id && item
      );
    };
    return { unSubscribe };
  };

  once = (
    execute: EventExecute<T>,
    complete?: EventComplete,
    error?: EventError
  ) => {
    const off = this.subscribe(
      (...args) => {
        off.unSubscribe();
        execute(...args);
      },
      complete,
      error
    );
  };

  watch = (cb: (...args: T) => boolean, timeLimit?: number) =>
    new Promise<T>((resolve, reject) => {
      const timeout =
        timeLimit &&
        setTimeout(() => {
          reject("Event watch timeout");
        }, timeLimit);

      const { unSubscribe } = this.subscribe((...args) => {
        const done = cb(...args);
        if (done) {
          if (timeout) clearTimeout(timeout);
          unSubscribe();
          resolve(args);
        }
      });
    });

  asPromise = (timeLimit?: number) =>
    new Promise<T>((resolve, reject) => {
      const timeout =
        timeLimit &&
        setTimeout(() => {
          reject("Event asPromise timeout");
        }, timeLimit);

      this.once(
        (...args) => {
          if (timeout) clearTimeout(timeout);
          resolve(args);
        },
        () => {
          if (timeout) clearTimeout(timeout);
          resolve([] as any);
        },
        (err) => {
          if (timeout) clearTimeout(timeout);
          reject(err);
        }
      );
    });

  get returnTrigger() {
    const { execute, error, complete } = this;
    return { execute, error, complete };
  }

  get returnListener() {
    const { subscribe, once, asPromise } = this;
    return { subscribe, once, asPromise };
  }

  get length() {
    return this.event.stack.length;
  }
}
