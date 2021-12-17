import { Car, Configuration } from "./types";
declare type SetupsDirPath = Configuration["setupsDirectoryPath"];
declare const _default: {
    init: (setupsDir: SetupsDirPath) => {
        cars: () => Promise<string[]>;
        tracks: (car: Car) => Promise<string[]>;
    };
};
export default _default;
