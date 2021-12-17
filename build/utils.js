"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.filesystem = void 0;
const promises_1 = __importDefault(require("fs/promises"));
var filesystem;
(function (filesystem) {
    filesystem.dirsOfDir = async (path) => (await promises_1.default.readdir(path, { withFileTypes: true }))
        .filter((dirent) => dirent.isDirectory())
        .map((dir) => dir.name);
})(filesystem = exports.filesystem || (exports.filesystem = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsMkRBQTZCO0FBRTdCLElBQWlCLFVBQVUsQ0FLMUI7QUFMRCxXQUFpQixVQUFVO0lBQ1osb0JBQVMsR0FBRyxLQUFLLEVBQUUsSUFBWSxFQUFFLEVBQUUsQ0FDOUMsQ0FBQyxNQUFNLGtCQUFFLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1NBQzlDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3hDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzlCLENBQUMsRUFMZ0IsVUFBVSxHQUFWLGtCQUFVLEtBQVYsa0JBQVUsUUFLMUIifQ==