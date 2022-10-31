const handlers = require("../src/handlers");

test("test homepage", () => {
  const req = {};
  const res = { render: jest.fn() };
  handlers.home(req, res);

  expect(res.render.mock.calls[0].length).toBe(1);
  expect(res.render.mock.calls[0][0]).toBe("home");
});

test("test aboutpage", () => {
  const req = {};
  const res = { render: jest.fn() };
  handlers.about(req, res);

  expect(res.render.mock.calls[0].length).toBe(2);
  expect(res.render.mock.calls[0][0]).toBe("about");
});
