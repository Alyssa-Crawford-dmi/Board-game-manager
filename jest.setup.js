import axios from "axios";
import { loginState } from "./src/utils/auth";

export const fakeGameData = {
  data: {
    games: [
      {
        id: "AuBvbISHR6",
        name: "Ticket To Ride",
        year_published: 2004,
        min_players: 2,
        max_players: 5,
        min_playtime: 45,
        max_playtime: 90,
        min_age: 8,
        description_preview: "",
        images: {},
        url: "https://www.boardgameatlas.com/game/AuBvbISHR6/ticket-to-ride",
        price: "43.50",
        msrp: "49.99",
        discount: "0.13",
        primary_publisher: {},
        publishers: [],
        developers: [],
        artists: ["Julien Delval", "Cyrille Daujean"],
        num_user_ratings: 498,
        average_user_rating: 3.440842183244887,
        official_url:
          "https://www.daysofwonder.com/tickettoride/en/?utm_source=boardgameatlas.com&utm_medium=search&utm_campaign=bga_ads",
        rules_url:
          "https://ncdn0.daysofwonder.com/tickettoride/en/img/tt_rules_2015_en.pdf",
        primary_designer: {},
      },
      {
        id: "2",
        name: "game2",
        images: [],
        artists: ["Julien Delval", "Cyrille Daujean"],
        average_user_rating: 3.440842183244887,
        primary_publisher: {},
        primary_designer: {},
        description_preview: "",
      },
      {
        id: "3",
        name: "game3",
        images: [],
        artists: ["Julien Delval", "Cyrille Daujean"],
        average_user_rating: 3.440842183244887,
        primary_publisher: {},
        primary_designer: {},
        description_preview: "",
      },
    ],
  },
};
const fakeIds = {
  data: {
    gamesList: '["1"]',
  },
};

jest.mock("axios");
jest.mock("./src/utils/auth");

axios.get.mockImplementation((url) => {
  if (url.includes("boardgameatlas")) {
    return Promise.resolve(fakeGameData);
  }
  return Promise.resolve(fakeIds);
});
axios.put.mockImplementation((url) => {
  return Promise.resolve({ status: 200 });
});
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
