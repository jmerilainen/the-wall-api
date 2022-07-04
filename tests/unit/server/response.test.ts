/*eslint @typescript-eslint/no-empty-function: ["error", { "allow": ["arrowFunctions"] }]*/

import { json } from "../../../src/server/response";

test("fn json to return response object", () => {
  const res = json({ message: "test" });

  expect(res).toStrictEqual({
    status: 200,
    type: "application/json",
    data: JSON.stringify({ message: "test" }),
  });
});
