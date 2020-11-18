import axios from "axios";

const fakeResult = {
  data: {
    games: [],
  },
};

jest.mock("axios");

axios.get.mockResolvedValue(fakeResult);

const originalWarn = console.warn.bind(console.warn);
const originalInfo = console.info.bind(console.info);
beforeAll(() => {
  console.warn = (msg) =>
    !msg.toString().includes("navManager") && originalWarn(msg);
  console.info = (msg) =>
    !msg.toString().includes("<Suspense>") && originalInfo(msg);
});
afterAll(() => {
  console.warn = originalWarn;
  console.info = originalInfo;
});
