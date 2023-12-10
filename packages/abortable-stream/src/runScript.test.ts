import fs from "fs";
import abortableGenerator from "./abortableGenerator";
import defaultShouldAbortFn from "./defaultShouldAbortFn";
import path from "path";

jest.setTimeout(60000);

jest.mock("stream-json", () => {
  const mockStreamValues = () => {
    const data = [{ value: { id: "mockId1" } }, { value: { id: "mockId2" } }];
    return {
      [Symbol.asyncIterator]() {
        let index = 0;
        return {
          next: () => {
            if (index < data.length) {
              return Promise.resolve({ value: data[index++], done: false });
            }
            return Promise.resolve({ done: true });
          },
        };
      },
    };
  };

  return {
    parser: jest.fn().mockReturnValue({
      pipe: jest.fn().mockImplementation(() => mockStreamValues()),
    }),
    streamValues: mockStreamValues,
  };
});

jest.mock("path", () => ({
  ...jest.requireActual("path"),
  resolve: jest
    .fn()
    .mockReturnValue(
      "C:/Users/hkcha/OneDrive/Desktop/codetesttemplate/data/current"
    ),
}));

describe("runScript Functionality", () => {
  const ms_timeout = 8000;
  const maxDocuments = 100;

  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should process documents up to the maximum count", async () => {
    const abortFn = defaultShouldAbortFn({ timeout: ms_timeout, maxDocuments });
    let processedCount = 0;

    for await (const document of abortableGenerator(abortFn, "mocked/path")) {
      processedCount++;
      if (processedCount >= maxDocuments) {
        break;
      }
    }

    expect(processedCount).toBeLessThanOrEqual(maxDocuments);
  }, 60000);
});
