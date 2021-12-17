"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const TODO = "/mnt/c/Users/karpp";
const DEFAULT_CONFIG = {
    setupsDirectoryPath: path_1.default.join(TODO, "/Documents/Assetto Corsa Competizione/Setups"),
};
const CONFIG_PATH = path_1.default.join(TODO, "acc-setups.json");
const ENCODING = "utf-8";
const exists = () => promises_1.default
    .access(CONFIG_PATH)
    .then(() => true)
    .catch(() => false);
const init = () => promises_1.default.writeFile(CONFIG_PATH, JSON.stringify(DEFAULT_CONFIG), ENCODING);
const read = async () => (await exists())
    ? JSON.parse(await promises_1.default.readFile(CONFIG_PATH, ENCODING))
    : init().then(read);
const get = async (option) => (await read())[option];
const set = async (option, value) => promises_1.default.writeFile(CONFIG_PATH, JSON.stringify(Object.assign(Object.assign({}, (await read())), { [option]: value })), ENCODING);
exports.default = {
    get,
    set,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9jb25maWd1cmF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsMkRBQTZCO0FBRTdCLGdEQUF3QjtBQUV4QixNQUFNLElBQUksR0FBRyxvQkFBb0IsQ0FBQztBQUVsQyxNQUFNLGNBQWMsR0FBa0I7SUFDcEMsbUJBQW1CLEVBQUUsY0FBSSxDQUFDLElBQUksQ0FDNUIsSUFBSSxFQUNKLDhDQUE4QyxDQUMvQztDQUNGLENBQUM7QUFDRixNQUFNLFdBQVcsR0FBRyxjQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0FBQ3ZELE1BQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQztBQUV6QixNQUFNLE1BQU0sR0FBRyxHQUFHLEVBQUUsQ0FDbEIsa0JBQUU7S0FDQyxNQUFNLENBQUMsV0FBVyxDQUFDO0tBQ25CLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUM7S0FDaEIsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBRXhCLE1BQU0sSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUNoQixrQkFBRSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztBQUV0RSxNQUFNLElBQUksR0FBRyxLQUFLLElBQTRCLEVBQUUsQ0FDOUMsQ0FBQyxNQUFNLE1BQU0sRUFBRSxDQUFDO0lBQ2QsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxrQkFBRSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDdEQsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUV4QixNQUFNLEdBQUcsR0FBRyxLQUFLLEVBQUUsTUFBMkIsRUFBRSxFQUFFLENBQUMsQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7QUFFMUUsTUFBTSxHQUFHLEdBQUcsS0FBSyxFQUNmLE1BQVMsRUFDVCxLQUF1QixFQUN2QixFQUFFLENBQ0Ysa0JBQUUsQ0FBQyxTQUFTLENBQ1YsV0FBVyxFQUNYLElBQUksQ0FBQyxTQUFTLGlDQUFNLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQyxLQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsS0FBSyxJQUFHLEVBQ3RELFFBQVEsQ0FDVCxDQUFDO0FBRUosa0JBQWU7SUFDYixHQUFHO0lBQ0gsR0FBRztDQUNKLENBQUMifQ==