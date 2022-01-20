import { Car, Configuration, Track } from "./types";
import path from "path";
import * as utils from "./utils";
import fs from "fs/promises";

type SetupsDirPath = Configuration["setupsDirectoryPath"];

export default {
  initRoot: (setupsDir: SetupsDirPath) => ({
    cars: () => utils.filesystem.dirsOfDir(setupsDir),

    tracks: (car: Car) => utils.filesystem.dirsOfDir(path.join(setupsDir, car)),

    setups: (car: Car, track: Track) =>
      utils.filesystem.filesOfDir(path.join(setupsDir, car, track)),

    setup: async (car: Car, track: Track, fileName: string) =>
      JSON.parse(
        await fs.readFile(path.join(setupsDir, car, track, fileName), "utf-8")
      ),
  }),
};
