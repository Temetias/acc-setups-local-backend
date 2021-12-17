"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
const resources_1 = __importDefault(require("./resources"));
const configuration_1 = __importDefault(require("./configuration"));
(async () => {
    const PORT = process.env.PORT || 8888;
    const resources = resources_1.default.init(await configuration_1.default.get("setupsDirectoryPath"));
    server_1.default
        .create({
        "/": () => "Hello world!",
        "/cars": async () => JSON.stringify(await resources.cars()),
        "/tracks": async (_, { query }) => JSON.stringify(await resources.tracks(query.car)),
    })
        .listen(PORT, () => console.log(`🚀 Listening on localhost:${PORT}! 🚀`));
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxzREFBOEI7QUFDOUIsNERBQXVDO0FBQ3ZDLG9FQUE0QztBQUc1QyxDQUFDLEtBQUssSUFBSSxFQUFFO0lBQ1YsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDO0lBRXRDLE1BQU0sU0FBUyxHQUFHLG1CQUFZLENBQUMsSUFBSSxDQUNqQyxNQUFNLHVCQUFhLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQy9DLENBQUM7SUFFRixnQkFBTTtTQUNILE1BQU0sQ0FBQztRQUNOLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxjQUFjO1FBQ3pCLE9BQU8sRUFBRSxLQUFLLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDM0QsU0FBUyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLENBQ2hDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQU0sQ0FBQyxHQUFVLENBQUMsQ0FBQztLQUM1RCxDQUFDO1NBQ0QsTUFBTSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLDZCQUE2QixJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDOUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyJ9