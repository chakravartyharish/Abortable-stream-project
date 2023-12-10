// ../../node_modules/.pnpm/tsup@5.12.9_ts-node@10.9.2_typescript@4.9.3/node_modules/tsup/assets/esm_shims.js
import { fileURLToPath } from "url";
import path from "path";
var getFilename = () => fileURLToPath(import.meta.url);
var getDirname = () => path.dirname(getFilename());
var __dirname = /* @__PURE__ */ getDirname();

// src/abortableGenerator.ts
import * as fs from "fs";
import * as path2 from "path";
import { parser } from "stream-json";
import { streamValues } from "stream-json/streamers/StreamValues";
async function* abortableGenerator(shouldAbortFn, directoryPath) {
  const folderPath = path2.resolve(__dirname, "../../../data/current");
  console.log(
    `${new Date().toISOString()} - Streaming files from: ${folderPath}`
  );
  try {
    for (const file of fs.readdirSync(folderPath)) {
      const filePath = path2.join(folderPath, file);
      console.log(`${new Date().toISOString()} - Processing file: ${file}`);
      if (shouldAbortFn()) {
        console.log(
          `${new Date().toISOString()} - Aborting processing: abort function triggered before file processing.`
        );
        return;
      }
      try {
        const fileStream = fs.createReadStream(filePath);
        const jsonStream = fileStream.pipe(parser()).pipe(streamValues());
        for await (const { value } of jsonStream) {
          if (shouldAbortFn()) {
            console.log(
              `${new Date().toISOString()} - Aborting processing inside JSON stream: abort function triggered during file processing.`
            );
            return;
          }
          if (value && value.id) {
            console.log(
              `${new Date().toISOString()} - Yielding document: ${value.id}`
            );
            yield value;
          }
        }
      } catch (innerError) {
        console.error(
          `${new Date().toISOString()} - Error processing file ${file}: ${innerError}`
        );
        continue;
      }
    }
  } catch (outerError) {
    if (outerError instanceof Error) {
      console.error(
        `${new Date().toISOString()} - Error reading files from directory: ${outerError.message}`
      );
      throw new Error(`Failed to read directory: ${outerError.message}`);
    } else {
      console.error(
        `${new Date().toISOString()} - An unexpected error occurred`
      );
      throw outerError;
    }
  }
}

// src/defaultShouldAbortFn.ts
var shouldAbort = false;
var timerTriggered = false;
var processedDocuments = 0;
function defaultShouldAbortFn({
  timeout,
  maxDocuments
}) {
  setTimeout(() => {
    console.log(
      `${new Date().toISOString()} - Timeout reached, will abort upon next check`
    );
    timerTriggered = true;
  }, timeout);
  return () => {
    if (timerTriggered) {
      shouldAbort = true;
      timerTriggered = false;
    }
    if (processedDocuments >= maxDocuments) {
      console.log(
        `${new Date().toISOString()} - Max document count reached, will abort upon next check`
      );
      shouldAbort = true;
    }
    processedDocuments++;
    return shouldAbort;
  };
}
export {
  abortableGenerator,
  defaultShouldAbortFn
};
