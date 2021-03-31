import ConfirmModal from "@/components/Modals/ConfirmModal.vue";
import { mount } from "@vue/test-utils";
import Button from "primevue/button";

describe("DeleteModal.vue", () => {
  let wrapper;
  const gameName = "Ticket to ride";

  beforeEach(() => {
    wrapper = mount(ConfirmModal, {
      props: {
        gameName,
        actionName: "remove",
        listName: "wishlist",
      },
    });
  });

  it("Clicking on the button emits action-confirmed", async () => {
    await wrapper.findComponent(Button).trigger("click");
    expect(wrapper.emitted("action-confirmed")).toBeTruthy();
  });

  it("displays the gameName which was passed as a prop", async () => {
    const modalText = await wrapper.find("p").text();
    expect(modalText.includes(gameName)).toBe(true);
  });
});
