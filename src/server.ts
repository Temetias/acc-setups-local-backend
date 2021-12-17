import http from "http";
import { ParsedUrlQuery } from "querystring";
import url from "url";

type Path = `/${string}`;

type RequestData = { payload?: string; query?: ParsedUrlQuery };

type Routes = Record<
  Path,
  (req: http.IncomingMessage, data: RequestData) => string | Promise<string>
>;

const notFound = (path: Path, res: http.ServerResponse) => {
  res.writeHead(404);
  res.end(`${path} not found`);
};

const getRouter =
  (routes: Routes) =>
  async (
    path: Path,
    req: http.IncomingMessage,
    res: http.ServerResponse,
    data: RequestData
  ) =>
    routes[path]
      ? (async () => {
          res.writeHead(200, { "Content-Type": "application/json" });
          res.write(await routes[path](req, data));
          res.end();
        })()
      : notFound(path, res);

const getReqHandler = (routes: Routes) => {
  const route = getRouter(routes);
  return (req: http.IncomingMessage, res: http.ServerResponse) => {
    const { query, pathname } = url.parse(req.url || "", true);
    let payload = "";
    req.on("data", (chunk) => (payload += chunk));
    req.on("end", () => route(pathname as Path, req, res, { payload, query }));
  };
};

const create = (routes: Routes) => http.createServer(getReqHandler(routes));

export default {
  create,
};
