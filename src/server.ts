import http, { ServerResponse } from "http";
import { ParsedUrlQuery } from "querystring";
import url from "url";

type Path = `/${string}`;

type RequestData = { payload?: string; query?: ParsedUrlQuery };

type Routes = Record<
  Path,
  (
    req: http.IncomingMessage,
    data: RequestData
  ) => RespondToken | Promise<RespondToken>
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
      ? (async () => (await routes[path](req, data))(res))()
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

type RespondToken = (res: ServerResponse) => {
  x: "NOT_TO_BE_DONE_MANUALLY_USE_RESPOND_BUILDERS";
};

const respond =
  (
    data: object,
    {
      statusCode,
      ...headers
    }: Omit<http.OutgoingHttpHeaders, "Content-Type"> & { statusCode: number }
  ): RespondToken =>
  (res: http.ServerResponse) => {
    res.writeHead(statusCode, {
      ...headers,
      "Content-Type": "application/json",
    });
    res.write(JSON.stringify(data));
    res.end();
    return { x: "NOT_TO_BE_DONE_MANUALLY_USE_RESPOND_BUILDERS" };
  };

const respondOk = (
  data: object,
  headers: Omit<http.OutgoingHttpHeaders, "Content-Type"> = {}
) => respond(data, { ...headers, statusCode: 200 });

export default {
  create,
  respond,
  respondOk,
};
