import { mount } from "@vue/test-utils";
import DetailModal from "@/components/Modals/DetailModalWrapper.vue";
import axios from "axios";

describe("DetailModal.vue", () => {
  let wrapper;

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
