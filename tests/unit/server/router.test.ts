/*eslint @typescript-eslint/no-empty-function: ["error", { "allow": ["arrowFunctions"] }]*/

import { createRouter } from "../../../src/server/router";

test("Router can match absolute paths", () => {
  const route = createRouter();

  route.get("/", () => {});
  route.get("/posts", () => {});

  const current = route.resolve("get", "/posts");

  expect(current?.id).toBe("/posts");
});

test("Router can match regex paths", () => {
  const route = createRouter();

  route.get("/", () => {});
  route.get(/^\/posts\/(?<id>\d+)$/, () => {});

  const current = route.resolve("get", "/posts/34");

  expect(current?.id).toBe("/^\\/posts\\/(?<id>\\d+)$/");
});
