"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.tsx
var src_exports = {};
__export(src_exports, {
  abortableGenerator: () => abortableGenerator,
  defaultShouldAbortFn: () => defaultShouldAbortFn
});
module.exports = __toCommonJS(src_exports);

// src/abortableGenerator.ts
var import_fs = __toESM(require("fs"), 1);
var import_path = __toESM(require("path"), 1);
var import_stream_json = require("stream-json");
var import_StreamValues = require("stream-json/streamers/StreamValues");
async function* abortableGenerator(shouldAbortFn) {
  const folderPath = import_path.default.resolve(__dirname, "../../../data/current");
  for (const file of import_fs.default.readdirSync(folderPath)) {
    if (shouldAbortFn()) {
      console.log("Aborting processing");
      return;
    }
    const filePath = import_path.default.join(folderPath, file);
    const fileStream = import_fs.default.createReadStream(filePath);
    const jsonStream = fileStream.pipe((0, import_stream_json.parser)()).pipe((0, import_StreamValues.streamValues)());
    for await (const { value } of jsonStream) {
      if (shouldAbortFn()) {
        console.log("Aborting processing");
        fileStream.close();
        return;
      }
      yield value;
    }
  }
}

// src/defaultShouldAbortFn.ts
var shouldAbort = false;
function defaultShouldAbortFn(timeoutms = 4e3) {
  setTimeout(() => shouldAbort = true, timeoutms);
  return () => shouldAbort;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  abortableGenerator,
  defaultShouldAbortFn
});
