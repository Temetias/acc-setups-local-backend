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
      "/": () => server.respondOk({ message: "Hello World!" }),
      "/cars": async () => server.respondOk(await resources.cars()),
      "/tracks": async (_, { query }) =>
        query?.car
          ? server.respondOk(await resources.tracks(query!.car as Car))
          : server.respond({ error: "Bad request" }, { statusCode: 400 }),
    })
    .listen(PORT, () => console.log(`🚀 Listening on localhost:${PORT}! 🚀`));
})();
