import request from "supertest";

import { createServer } from "../../../src/server";
import controllers from "../../../src/controllers";

const app = createServer();
app.get("/", controllers.home.index);

describe("Route /", () => {
  test("GET", async () => {
    const res = await request(app.server).get("/");

    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual({ message: "Hello World!" });
  });
});
