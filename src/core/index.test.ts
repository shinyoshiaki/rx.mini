import Event from ".";

describe("event", () => {
  test("subscribe", () => {
    const testEvent = new Event<{ msg: string }>();
    const { unSubscribe } = testEvent.subscribe(data => {
      expect(data.msg).toBe("1");
    });

    testEvent.subscribe(data => {
      expect(data.msg).toBe("1");
    });

    testEvent.execute({ msg: "1" });

    expect((testEvent as any).event.stack.length).toBe(2);
    unSubscribe();
    expect((testEvent as any).event.stack.length).toBe(1);

    testEvent.once(() => {
      expect((testEvent as any).event.stack.length).toBe(1);
    });
    expect((testEvent as any).event.stack.length).toBe(2);
    testEvent.execute({ msg: "1" });
  });

  test("aspromise", async () => {
    const testEvent = new Event<number>();
    setTimeout(() => {
      testEvent.execute(1);
    }, 0);
    const res = await testEvent.asPromise();
    expect(res).toBe(1);
  });
});