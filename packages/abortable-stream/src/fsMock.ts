import * as fs from "fs";

export function readdirSync(directory: string): string[] {
  if (directory === "/mocked-directory") {
    return ["file1.json", "file2.json"];
  }

  return fs.readdirSync(directory);
}
