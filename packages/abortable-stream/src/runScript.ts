import abortableGenerator from "./abortableGenerator";
import defaultShouldAbortFn from "./defaultShouldAbortFn";

console.log(`${new Date().toISOString()} - Start processing`);
const ms_timeout = 8000; // Time after which processing should be aborted
const maxDocuments = 100; // Maximum number of documents to process

const abortFn = defaultShouldAbortFn({
  timeout: ms_timeout,
  maxDocuments: maxDocuments,
});

(async () => {
  try {
    let processedCount = 0;
    for await (const document of abortableGenerator(abortFn, "mocked/path")) {
      console.log(
        `${new Date().toISOString()} - Processing document`,
        document?.id ?? "undefined"
      );
      const PROCESSING_DELAY_MS = parseInt(
        // eslint-disable-next-line turbo/no-undeclared-env-vars
        process.env.DOCUMENT_PROCESSING_DELAY_MS || "1"
      );

      await new Promise((resolve) => setTimeout(resolve, PROCESSING_DELAY_MS));

      processedCount++;
      if (abortFn()) {
        console.log(
          `${new Date().toISOString()} - Generator loop was gracefully aborted`
        );
        break;
      }
      if (processedCount >= maxDocuments) {
        console.log(
          `${new Date().toISOString()} - Max document count reached, aborting`
        );
        break;
      }
    }
  } catch (error) {
    console.error(
      `${new Date().toISOString()} - Error during processing:`,
      error
    );
  }
})();
