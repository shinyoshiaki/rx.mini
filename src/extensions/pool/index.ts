import Event from "../../core";

export function Pool<T>(length: number, event: Event<T>) {
  const observable = new Event<T>();
  const pool: T[] = [];
  event.subscribe(e => {
    pool.push(e);
    if (pool.length >= length) {
      const data = pool.shift();
      if (data) observable.execute(data);
    }
  });

  const { subscribe, asPromise, once } = observable;
  return { subscribe, asPromise, once };
}
