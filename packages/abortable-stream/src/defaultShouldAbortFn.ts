let shouldAbort = false;
let timerTriggered = false;
let processedDocuments = 0;

export function resetAbort() {
  shouldAbort = false;
  timerTriggered = false;
  processedDocuments = 0;
}

export default function defaultShouldAbortFn({
  timeout,
  maxDocuments,
}: {
  timeout: number;
  maxDocuments: number;
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
      timerTriggered = false; // Reset so that it only aborts once per timeout
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
