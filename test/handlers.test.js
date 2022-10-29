const handlers = require("../src/handlers");
test("test homepage", () => {
  const req = {};
  const res = { render: jest.fn() };
  handlers.home(req, res);

  expect(res.render.mock.calls[0].length).toBe(2);
  expect(res.render.mock.calls[0][0]).toBe("home");
});
