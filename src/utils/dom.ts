export function getEventTarget<T>(event: Event, constructor: { new (): T }): T {
  const target: EventTarget | null = event.target;
  if (target instanceof constructor) {
    return target;
  }
  throw new Error(
    "Expected event target to be a " +
      typeof constructor +
      " but got: " +
      typeof target
  );
}
