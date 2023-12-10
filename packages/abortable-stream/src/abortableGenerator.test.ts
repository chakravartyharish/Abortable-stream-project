import abortableGenerator from "./abortableGenerator";

describe("abortableGenerator", () => {
  it("should handle abortion correctly", async () => {
    const shouldAbortFn = jest
      .fn()
      .mockReturnValueOnce(false)
      .mockReturnValue(true);

    const generator = abortableGenerator(
      shouldAbortFn,
      "C:/Users/hkcha/OneDrive/Desktop/data/current"
    );

    const result = [];
    for await (const document of generator) {
      result.push(document);
    }

    expect(result).toEqual([]);
  });
});
