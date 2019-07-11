import Event from "../../core";
import { Pool } from ".";

test("pool", async () => {
  const event = new Event<number>();
  const pool = Pool(3, event);
  let i = 0;
  pool.subscribe(() => {
    expect(i > 3).toBe(true);
  });
  event.execute(i++);
  event.execute(i++);
  event.execute(i++);
  event.execute(i++);
  event.execute(i++);
  event.execute(i++);
});
