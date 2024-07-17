const app = require('../src/app')
const request = require("supertest")
const baseURL = "localhost:8080"

describe('testing app file', () => {
  it("should return 200", async () => {
    const res = await request(app).get("/")
    expect(res.statusCode).toEqual(200)
  });
});