import defaultShouldAbortFn, { resetAbort } from "./defaultShouldAbortFn";

beforeEach(() => {
  jest.useFakeTimers();
  resetAbort();
});

afterEach(() => {
  jest.useRealTimers();
});

describe("defaultShouldAbortFn", () => {
  it("should not abort immediately", () => {
    const abortFn = defaultShouldAbortFn({ timeout: 100, maxDocuments: 1 });
    expect(abortFn()).toBe(false);
  });

  it("should abort after timeout", () => {
    const abortFn = defaultShouldAbortFn({ timeout: 100, maxDocuments: 1 });
    jest.advanceTimersByTime(100);
    expect(abortFn()).toBe(true);
  });

  it("should not abort before timeout even if documents are processed", () => {
    const abortFn = defaultShouldAbortFn({ timeout: 1000, maxDocuments: 10 });
    for (let i = 0; i < 5; i++) {
      abortFn();
    }
    expect(abortFn()).toBe(false);
  });

  it("should abort when max document count is reached", () => {
    const abortFn = defaultShouldAbortFn({ timeout: 1000, maxDocuments: 5 });
    for (let i = 0; i < 5; i++) {
      abortFn();
    }
    expect(abortFn()).toBe(true);
  });

  it("should not abort if no documents are processed and timeout not reached", () => {
    const abortFn = defaultShouldAbortFn({ timeout: 1000, maxDocuments: 10 });
    jest.advanceTimersByTime(500);
    expect(abortFn()).toBe(false);
  });

  it("should abort on next check after timeout", () => {
    const abortFn = defaultShouldAbortFn({ timeout: 100, maxDocuments: 10 });
    expect(abortFn()).toBe(false);
    jest.advanceTimersByTime(100);
    expect(abortFn()).toBe(true);
  });

  it("should handle different timeout and max document settings", () => {
    const timeout = 200;
    const maxDocuments = 2;
    const abortFn = defaultShouldAbortFn({ timeout, maxDocuments });
    jest.advanceTimersByTime(timeout - 100);
    expect(abortFn()).toBe(false);
    for (let i = 0; i < maxDocuments; i++) {
      abortFn();
    }
    expect(abortFn()).toBe(true);
  });

  it("should correctly reset the abort condition", () => {
    const abortFn = defaultShouldAbortFn({ timeout: 100, maxDocuments: 1 });
    jest.advanceTimersByTime(100);
    expect(abortFn()).toBe(true);
    resetAbort();
    expect(abortFn()).toBe(false);
  });
});
