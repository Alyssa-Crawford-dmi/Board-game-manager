import { mount } from "@vue/test-utils";
import DetailModal from "@/components/Modals/DetailModalWrapper.vue";
import axios from "axios";

const fakeResult = {
  data: {
    games: [
      { name: "game1", images: [] },
      { name: "game2", images: [] },
      { name: "game3", images: [] },
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
