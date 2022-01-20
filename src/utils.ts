import fs from "fs/promises";

export namespace filesystem {
  const xOfDir = (x: "dirs" | "files") => async (path: string) =>
    (await fs.readdir(path, { withFileTypes: true }))
      .filter((dirent) =>
        x === "dirs" ? dirent.isDirectory() : !dirent.isDirectory()
      )
      .map((dir) => dir.name);

  export const dirsOfDir = xOfDir("dirs");
  export const filesOfDir = xOfDir("files");
}
