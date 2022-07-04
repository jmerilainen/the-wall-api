import type { IncomingMessage } from "http";
import type { URLSearchParams } from "url";
import type { Controller } from "./controller";

export interface RouteProps {
  request: IncomingMessage;
  params: URLSearchParams;
}

export interface Route {
  method: string;
  id: string;
  matcher: RegExp;
  controller: Controller;
}

type Path = string | RegExp;

export type AddRoute = (path: Path, controller: Route["controller"]) => void;

export type RegisterRoute = (
  method: Route["method"],
  path: Path,
  controller: Route["controller"]
) => void;
