import server from "./server";
import rootResource from "./resources";
import configuration from "./configuration";
import { Car } from "./types";

(async () => {
  const PORT = process.env.PORT || 8888;

  const resources = rootResource.init(
    await configuration.get("setupsDirectoryPath")
  );

  server
    .create({
      "/": () => "Hello world!",
      "/cars": async () => JSON.stringify(await resources.cars()),
      "/tracks": async (_, { query }) =>
        JSON.stringify(await resources.tracks(query!.car as Car)),
    })
    .listen(PORT, () => console.log(`🚀 Listening on localhost:${PORT}! 🚀`));
})();
