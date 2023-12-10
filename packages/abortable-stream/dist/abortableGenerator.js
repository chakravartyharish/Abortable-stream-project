"use strict";
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function () { return this; }, i;
    function awaitReturn(f) { return function (v) { return Promise.resolve(v).then(f, reject); }; }
    function verb(n, f) { if (g[n]) { i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; if (f) i[n] = f(i[n]); } }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var stream_json_1 = require("stream-json");
var StreamValues_1 = require("stream-json/streamers/StreamValues");
function abortableGenerator(shouldAbortFn, directoryPath) {
    return __asyncGenerator(this, arguments, function abortableGenerator_1() {
        var folderPath, _i, _a, file, filePath, fileStream, jsonStream, _b, jsonStream_1, jsonStream_1_1, value, e_1_1, innerError_1, outerError_1;
        var _c, e_1, _d, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    folderPath = path.resolve(__dirname, "../../../data/current");
                    console.log("".concat(new Date().toISOString(), " - Streaming files from: ").concat(folderPath));
                    _f.label = 1;
                case 1:
                    _f.trys.push([1, 24, , 25]);
                    _i = 0, _a = fs.readdirSync(folderPath);
                    _f.label = 2;
                case 2:
                    if (!(_i < _a.length)) return [3 /*break*/, 23];
                    file = _a[_i];
                    filePath = path.join(folderPath, file);
                    console.log("".concat(new Date().toISOString(), " - Processing file: ").concat(file));
                    if (!shouldAbortFn()) return [3 /*break*/, 4];
                    console.log("".concat(new Date().toISOString(), " - Aborting processing: abort function triggered before file processing."));
                    return [4 /*yield*/, __await(void 0)];
                case 3: return [2 /*return*/, _f.sent()];
                case 4:
                    _f.trys.push([4, 21, , 22]);
                    fileStream = fs.createReadStream(filePath);
                    jsonStream = fileStream.pipe((0, stream_json_1.parser)()).pipe((0, StreamValues_1.streamValues)());
                    _f.label = 5;
                case 5:
                    _f.trys.push([5, 14, 15, 20]);
                    _b = true, jsonStream_1 = (e_1 = void 0, __asyncValues(jsonStream));
                    _f.label = 6;
                case 6: return [4 /*yield*/, __await(jsonStream_1.next())];
                case 7:
                    if (!(jsonStream_1_1 = _f.sent(), _c = jsonStream_1_1.done, !_c)) return [3 /*break*/, 13];
                    _e = jsonStream_1_1.value;
                    _b = false;
                    value = _e.value;
                    if (!shouldAbortFn()) return [3 /*break*/, 9];
                    console.log("".concat(new Date().toISOString(), " - Aborting processing inside JSON stream: abort function triggered during file processing."));
                    return [4 /*yield*/, __await(void 0)];
                case 8: return [2 /*return*/, _f.sent()];
                case 9:
                    if (!(value && value.id)) return [3 /*break*/, 12];
                    console.log("".concat(new Date().toISOString(), " - Yielding document: ").concat(value.id));
                    return [4 /*yield*/, __await(value)];
                case 10: return [4 /*yield*/, _f.sent()];
                case 11:
                    _f.sent();
                    _f.label = 12;
                case 12:
                    _b = true;
                    return [3 /*break*/, 6];
                case 13: return [3 /*break*/, 20];
                case 14:
                    e_1_1 = _f.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 20];
                case 15:
                    _f.trys.push([15, , 18, 19]);
                    if (!(!_b && !_c && (_d = jsonStream_1.return))) return [3 /*break*/, 17];
                    return [4 /*yield*/, __await(_d.call(jsonStream_1))];
                case 16:
                    _f.sent();
                    _f.label = 17;
                case 17: return [3 /*break*/, 19];
                case 18:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 19: return [7 /*endfinally*/];
                case 20: return [3 /*break*/, 22];
                case 21:
                    innerError_1 = _f.sent();
                    console.error("".concat(new Date().toISOString(), " - Error processing file ").concat(file, ": ").concat(innerError_1));
                    // continue, break, throw an error
                    return [3 /*break*/, 22]; // Continue to the next file
                case 22:
                    _i++;
                    return [3 /*break*/, 2];
                case 23: return [3 /*break*/, 25];
                case 24:
                    outerError_1 = _f.sent();
                    if (outerError_1 instanceof Error) {
                        console.error("".concat(new Date().toISOString(), " - Error reading files from directory: ").concat(outerError_1.message));
                        throw new Error("Failed to read directory: ".concat(outerError_1.message));
                    }
                    else {
                        console.error("".concat(new Date().toISOString(), " - An unexpected error occurred"));
                        throw outerError_1;
                    }
                    return [3 /*break*/, 25];
                case 25: return [2 /*return*/];
            }
        });
    });
}
exports.default = abortableGenerator;
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
