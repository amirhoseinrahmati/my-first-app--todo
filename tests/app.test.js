const request = require("supertest");
const app = require("../src/index");

describe("Todo API", () => {
  it("should return 200 on GET /", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
  });
});
