/// <reference types="node" />
import http from "http";
import { ParsedUrlQuery } from "querystring";
declare type Path = `/${string}`;
declare type RequestData = {
    payload?: string;
    query?: ParsedUrlQuery;
};
declare type Routes = Record<Path, (req: http.IncomingMessage, data: RequestData) => string | Promise<string>>;
declare const _default: {
    create: (routes: Routes) => http.Server;
};
export default _default;
