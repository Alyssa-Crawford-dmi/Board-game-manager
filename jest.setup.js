import axios from "axios";

const fakeResult = {
  data: {
    games: [],
  },
};

jest.mock("axios");

axios.get.mockResolvedValue(fakeResult);
