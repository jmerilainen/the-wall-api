import request from "supertest";

describe("Route: /", () => {
  test("GET", async () => {
    const response = await request("http://localhost:3000").get("/");

    expect(response.status).toEqual(200);
  });
});
