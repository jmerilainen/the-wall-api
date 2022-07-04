import type { RouteProps } from "./router";
import type { Response } from "./server";

export type Controller = ({
  request,
  params,
}: RouteProps) => Promise<Response> | Response | void;
