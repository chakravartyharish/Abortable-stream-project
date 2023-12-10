import * as fs from "fs";
import * as path from "path";
import { parser } from "stream-json";
import { streamValues } from "stream-json/streamers/StreamValues";

export default async function* abortableGenerator(
  shouldAbortFn: () => boolean,
  directoryPath: string
): AsyncGenerator<any> {
  const folderPath = path.resolve(__dirname, "../../../data/current");
  console.log(
    `${new Date().toISOString()} - Streaming files from: ${folderPath}`
  );

  try {
    for (const file of fs.readdirSync(folderPath)) {
      const filePath = path.join(folderPath, file);
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
        // continue, break, throw an error
        continue; // Continue to the next file
      }
    }
  } catch (outerError: unknown) {
    if (outerError instanceof Error) {
      console.error(
        `${new Date().toISOString()} - Error reading files from directory: ${
          outerError.message
        }`
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

// import * as fs from "fs";
// import * as path from "path";
// import { parser } from "stream-json";
// import { streamValues } from "stream-json/streamers/StreamValues";

// export default async function* abortableGenerator(
//   shouldAbortFn: () => boolean,
//   directoryPath: string
// ): AsyncGenerator<any> {
//   const folderPath = path.resolve(__dirname, "../../../data/current");
//   console.log(
//     `${new Date().toISOString()} - Streaming files from: ${folderPath}`
//   );

//   try {
//     for (const file of fs.readdirSync(folderPath)) {
//       const filePath = path.join(folderPath, file);
//       console.log(`${new Date().toISOString()} - Processing file: ${file}`);

//       if (shouldAbortFn()) {
//         console.log(
//           `${new Date().toISOString()} - Aborting processing: abort function triggered before file processing.`
//         );
//         return;
//       }

//       try {
//         const fileStream = fs.createReadStream(filePath);
//         const jsonStream = fileStream.pipe(parser()).pipe(streamValues());

//         for await (const { value } of jsonStream) {
//           if (shouldAbortFn()) {
//             console.log(
//               `${new Date().toISOString()} - Aborting processing inside JSON stream: abort function triggered during file processing.`
//             );
//             return;
//           }
//           if (value && value.id) {
//             console.log(
//               `${new Date().toISOString()} - Yielding document: ${value.id}`
//             );
//             yield value;
//           } else {
//             console.warn(
//               `${new Date().toISOString()} - Document structure is unexpected:`,
//               value
//             );
//           }
//         }
//       } catch (innerError) {
//         console.error(
//           `${new Date().toISOString()} - Error processing file ${file}: ${innerError}`
//         );
//         // continue, break, throw an error
//         continue; // Continue to the next file
//       }
//     }
//   } catch (outerError: unknown) {
//     if (outerError instanceof Error) {
//       console.error(
//         `${new Date().toISOString()} - Error reading files from directory: ${
//           outerError.message
//         }`
//       );
//       throw new Error(`Failed to read directory: ${outerError.message}`);
//     } else {
//       console.error(
//         `${new Date().toISOString()} - An unexpected error occurred`
//       );
//       throw outerError;
//     }
//   }
// }
