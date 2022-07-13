import request from "supertest";

describe("Route: /posts", () => {
  test("GET", async () => {
    const response = await request("http://localhost:3000").get("/posts");

    expect(response.status).toEqual(200);
    expect(response.body).toStrictEqual([]);
  });
});

describe("Route: /posts", () => {
  test("POST: Empty body", async () => {
    const response = await request("http://localhost:3000").post("/posts");

    expect(response.status).toEqual(400);
  });

  test("POST: Success", async () => {
    const response = await request("http://localhost:3000")
      .post("/posts")
      .send("content=Hello from Tests!");

    expect(response.status).toEqual(200);
    expect(response.body.content).toEqual("Hello from Tests!");
  });
});
