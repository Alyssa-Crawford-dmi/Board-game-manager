import { mount } from "@vue/test-utils";
import DetailModal from "@/components/Modals/DetailModalWrapper.vue";
import axios from "axios";

const fakeResult = {
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
    ],
  },
};

describe("DetailModal.vue", () => {
  let wrapper;
  axios.get.mockResolvedValue(fakeResult);

  beforeEach(() => {
    wrapper = mount(DetailModal, {
      props: { gameId: "1" },
    });
  });

  //Components
  it("Makes a call to axios when mounted", async () => {
    expect(axios.get).toHaveBeenCalled();
  });
});
