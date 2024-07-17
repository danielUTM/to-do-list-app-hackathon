const app = require('../src/app')
const request = require("supertest")
const baseURL = "localhost:8080"
const sql = require('../src/sqlMethods');


describe('testing app file', () => {
  it("root tests return 200", async () => {
    const res = await request(app).get("/")
    expect(res.statusCode).toEqual(200)
    expect(res.text).toEqual("Hello World")
  });
  
  it("get tasks gets tasks successfully", async () => {
    const return_val = {title: "a",
    summary: "b",
    created_at: new Date(500000000000).toDateString(),
    due_by: new Date(500000000000).toDateString(),
    completed: true,
    assigned_to: 1}
    const spy = jest.spyOn(sql, 'getAllTasksNonCompleted');
    spy.mockReturnValue(return_val);
    const res = await request(app).get("/tasks")
    expect(res.statusCode).toEqual(200)
    expect(res._body).toEqual(return_val)
    expect(spy).toHaveBeenCalled();
  } )
});