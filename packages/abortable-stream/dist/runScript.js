"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var abortableGenerator_1 = require("./abortableGenerator");
var defaultShouldAbortFn_1 = require("./defaultShouldAbortFn");
console.log("".concat(new Date().toISOString(), " - Start processing"));
var ms_timeout = 8000; // Time after which processing should be aborted
var maxDocuments = 100; // Maximum number of documents to process
var abortFn = (0, defaultShouldAbortFn_1.default)({
    timeout: ms_timeout,
    maxDocuments: maxDocuments,
});
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var processedCount, _loop_1, _a, _b, _c, state_1, e_1_1, error_1;
    var _d, e_1, _e, _f;
    var _g;
    return __generator(this, function (_h) {
        switch (_h.label) {
            case 0:
                _h.trys.push([0, 14, , 15]);
                processedCount = 0;
                _h.label = 1;
            case 1:
                _h.trys.push([1, 7, 8, 13]);
                _loop_1 = function () {
                    var document_1, PROCESSING_DELAY_MS;
                    return __generator(this, function (_j) {
                        switch (_j.label) {
                            case 0:
                                _f = _c.value;
                                _a = false;
                                document_1 = _f;
                                console.log("".concat(new Date().toISOString(), " - Processing document"), (_g = document_1 === null || document_1 === void 0 ? void 0 : document_1.id) !== null && _g !== void 0 ? _g : "undefined");
                                PROCESSING_DELAY_MS = parseInt(
                                // eslint-disable-next-line turbo/no-undeclared-env-vars
                                process.env.DOCUMENT_PROCESSING_DELAY_MS || "1");
                                return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, PROCESSING_DELAY_MS); })];
                            case 1:
                                _j.sent();
                                processedCount++;
                                if (abortFn()) {
                                    console.log("".concat(new Date().toISOString(), " - Generator loop was gracefully aborted"));
                                    return [2 /*return*/, "break"];
                                }
                                if (processedCount >= maxDocuments) {
                                    console.log("".concat(new Date().toISOString(), " - Max document count reached, aborting"));
                                    return [2 /*return*/, "break"];
                                }
                                return [2 /*return*/];
                        }
                    });
                };
                _a = true, _b = __asyncValues((0, abortableGenerator_1.default)(abortFn, "mocked/path"));
                _h.label = 2;
            case 2: return [4 /*yield*/, _b.next()];
            case 3:
                if (!(_c = _h.sent(), _d = _c.done, !_d)) return [3 /*break*/, 6];
                return [5 /*yield**/, _loop_1()];
            case 4:
                state_1 = _h.sent();
                if (state_1 === "break")
                    return [3 /*break*/, 6];
                _h.label = 5;
            case 5:
                _a = true;
                return [3 /*break*/, 2];
            case 6: return [3 /*break*/, 13];
            case 7:
                e_1_1 = _h.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 13];
            case 8:
                _h.trys.push([8, , 11, 12]);
                if (!(!_a && !_d && (_e = _b.return))) return [3 /*break*/, 10];
                return [4 /*yield*/, _e.call(_b)];
            case 9:
                _h.sent();
                _h.label = 10;
            case 10: return [3 /*break*/, 12];
            case 11:
                if (e_1) throw e_1.error;
                return [7 /*endfinally*/];
            case 12: return [7 /*endfinally*/];
            case 13: return [3 /*break*/, 15];
            case 14:
                error_1 = _h.sent();
                console.error("".concat(new Date().toISOString(), " - Error during processing:"), error_1);
                return [3 /*break*/, 15];
            case 15: return [2 /*return*/];
        }
    });
}); })();
