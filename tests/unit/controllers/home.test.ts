import { IncomingMessage } from "http";
import { Socket } from "net";

import controllers from "../../../src/controllers";

describe("Controller: home", () => {
  test("GET", async () => {
    const res = controllers.home.index({
      request: new IncomingMessage(new Socket()),
      params: new URLSearchParams(),
    });

    expect(res).toStrictEqual({
      status: 200,
      type: "application/json",
      data: JSON.stringify({ message: "Hello World!" }),
    });
  });
});
