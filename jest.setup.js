import axios from "axios";

const fakeResult = {
  data: {
    games: [],
  },
};

jest.mock("axios");

axios.get.mockResolvedValue(fakeResult);

const originalWarn = console.warn.bind(console.warn);
beforeAll(() => {
  console.warn = (msg) =>
    !msg.toString().includes("navManager") && originalWarn(msg);
});
afterAll(() => {
  console.warn = originalWarn;
});
