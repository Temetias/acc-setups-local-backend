import { Configuration } from "./types";
declare const _default: {
    get: (option: "setupsDirectoryPath") => Promise<string>;
    set: <T extends "setupsDirectoryPath">(option: T, value: Configuration[T]) => Promise<void>;
};
export default _default;
