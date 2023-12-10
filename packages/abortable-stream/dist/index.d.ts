declare function abortableGenerator(shouldAbortFn: () => boolean, directoryPath: string): AsyncGenerator<any>;

declare function defaultShouldAbortFn({ timeout, maxDocuments, }: {
    timeout: number;
    maxDocuments: number;
}): () => boolean;

export { abortableGenerator, defaultShouldAbortFn };
