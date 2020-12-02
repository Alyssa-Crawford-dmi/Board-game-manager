import axios from "axios";
import { loginState } from "./src/auth";

const fakeResult = {
  data: {
    games: [],
  },
};

jest.mock("axios");
jest.mock("./src/auth");

axios.get.mockResolvedValue(fakeResult);
loginState.loggedIn = true;

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
