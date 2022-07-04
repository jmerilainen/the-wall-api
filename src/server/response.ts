import type { Response } from "../types/server";

export function json<T>(data: T, status = 200): Response {
  return {
    status: status,
    type: "application/json",
    data: JSON.stringify(data),
  };
}
