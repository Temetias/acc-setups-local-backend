import { Car, Configuration } from "./types";
import path from "path";
import * as utils from "./utils";

type SetupsDirPath = Configuration["setupsDirectoryPath"];

export default {
  init: (setupsDir: SetupsDirPath) => ({
    cars: async () => utils.filesystem.dirsOfDir(setupsDir),

    tracks: async (car: Car) =>
      utils.filesystem.dirsOfDir(path.join(setupsDir, car)),
  }),
};
