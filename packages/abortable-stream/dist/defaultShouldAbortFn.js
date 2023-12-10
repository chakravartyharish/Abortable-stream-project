"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetAbort = void 0;
var shouldAbort = false;
var timerTriggered = false;
var processedDocuments = 0;
function resetAbort() {
    shouldAbort = false;
    timerTriggered = false;
    processedDocuments = 0;
}
exports.resetAbort = resetAbort;
function defaultShouldAbortFn(_a) {
    var timeout = _a.timeout, maxDocuments = _a.maxDocuments;
    setTimeout(function () {
        console.log("".concat(new Date().toISOString(), " - Timeout reached, will abort upon next check"));
        timerTriggered = true;
    }, timeout);
    return function () {
        if (timerTriggered) {
            shouldAbort = true;
            timerTriggered = false; // Reset so that it only aborts once per timeout
        }
        if (processedDocuments >= maxDocuments) {
            console.log("".concat(new Date().toISOString(), " - Max document count reached, will abort upon next check"));
            shouldAbort = true;
        }
        processedDocuments++;
        return shouldAbort;
    };
}
exports.default = defaultShouldAbortFn;
