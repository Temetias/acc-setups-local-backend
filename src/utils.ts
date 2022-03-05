import fs from "fs/promises";
import fsSync from "fs";
import path from "path";

export namespace filesystem {
  const xOfDir = (x: "dirs" | "files") => async (path: string) =>
    (await fs.readdir(path, { withFileTypes: true }))
      .filter((dirent) =>
        x === "dirs" ? dirent.isDirectory() : !dirent.isDirectory()
      )
      .map((dir) => dir.name);

  export const dirsOfDir = xOfDir("dirs");
  export const filesOfDir = xOfDir("files");

  const _watchRecursive = async (
    dir: string,
    listener: fsSync.WatchListener<string>,
    watchersP: fsSync.FSWatcher[]
  ): Promise<fsSync.FSWatcher[]> => {
    const watchers = [...watchersP, fsSync.watch(dir, listener)];
    const dirents = (await fs.readdir(dir, { withFileTypes: true })).filter(
      (dirent) => dirent.isDirectory()
    );
    return dirents.length
      ? (
          await Promise.all(
            dirents.map((dirent) =>
              _watchRecursive(path.join(dir, dirent.name), listener, watchers)
            )
          )
        ).flat()
      : watchers;
  };

  export const watchRecursive = async (
    dir: Parameters<typeof _watchRecursive>[0],
    listener: Parameters<typeof _watchRecursive>[1]
  ) => {
    const watchers = await _watchRecursive(dir, listener, []);
    return () => watchers.map((w) => w.close());
  };
}
