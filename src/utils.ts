import fs from "fs/promises";

export namespace filesystem {
  export const dirsOfDir = async (path: string) =>
    (await fs.readdir(path, { withFileTypes: true }))
      .filter((dirent) => dirent.isDirectory())
      .map((dir) => dir.name);
}
