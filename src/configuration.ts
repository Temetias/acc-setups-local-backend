import fs from "fs/promises";
import { Configuration } from "./types";
import path from "path";

const TODO = "/mnt/c/Users/karpp";

const DEFAULT_CONFIG: Configuration = {
  setupsDirectoryPath: path.join(
    TODO,
    "/Documents/Assetto Corsa Competizione/Setups"
  ),
};
const CONFIG_PATH = path.join(TODO, "acc-setups.json");
const ENCODING = "utf-8";

const exists = () =>
  fs
    .access(CONFIG_PATH)
    .then(() => true)
    .catch(() => false);

const init = () =>
  fs.writeFile(CONFIG_PATH, JSON.stringify(DEFAULT_CONFIG), ENCODING);

const read = async (): Promise<Configuration> =>
  (await exists())
    ? JSON.parse(await fs.readFile(CONFIG_PATH, ENCODING))
    : init().then(read);

const get = async (option: keyof Configuration) => (await read())[option];

const set = async <T extends keyof Configuration>(
  option: T,
  value: Configuration[T]
) =>
  fs.writeFile(
    CONFIG_PATH,
    JSON.stringify({ ...(await read()), [option]: value }),
    ENCODING
  );

export default {
  get,
  set,
};
