import server from "./server";
import resource from "./resources";
import configuration from "./configuration";
import { Car, Track } from "./types";

(async () => {
  const PORT = process.env.PORT || 8888;

  const resources = resource.initRoot(
    await configuration.get("setupsDirectoryPath")
  );

  server
    .create({
      "/": () => server.respondOk({ message: "Hello World!" }),

      "/cars": async () => server.respondOk(await resources.cars()),

      "/tracks": async (_, { query }) =>
        query?.car
          ? server.respondOk(await resources.tracks(query.car as Car))
          : server.respondBadRequest("Car not provided"),

      "/setups": async (_, { query }) =>
        query?.car && query?.track
          ? server.respondOk(
              await resources.setups(query.car as Car, query.track as Track)
            )
          : server.respondBadRequest("Car or track not provided"),

      "/setup": async (_, { query }) =>
        query?.car && query?.track && query?.setup
          ? server.respondOk(
              await resources.setup(
                query.car as Car,
                query.track as Track,
                query.setup as string
              )
            )
          : server.respondBadRequest("Car, track or setup not provided"),
    })
    .listen(PORT, () => console.log(`🚀 Listening on localhost:${PORT}! 🚀`));
})();
