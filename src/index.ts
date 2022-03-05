import server from "./server";
import resource from "./resources";
import configuration from "./configuration";
import { Car, Track } from "./types";

(async () => {
  const PORT = parseInt(process.env.PORT || "8888");

  const resources = resource.init(
    await configuration.get("setupsDirectoryPath"),

    // JÄIT TÄHÄN: WS EI RESOLVAA ENNENKU TULEE YHTEYS
    await server.ws(PORT, {
      onMessage: (msg) => console.log("Received ws message: ", msg),
      onInit: () =>
        console.log(`⚡ Websocket initiated on localhost:${PORT} ⚡`),
    })
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
