import { mount } from "@vue/test-utils";
import DeleteModal from "@/components/Modals/DeleteModal.vue";
import Button from "primevue/button";

describe("BaseModal.vue", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(DeleteModal);
  });

  it("Clicking on the button emits delete-confirmed", async () => {
    await wrapper.findComponent(Button).trigger("click");
    expect(wrapper.emitted("delete-confirmed")).toBeTruthy();
  });

  it("displays the gameName which was passed as a prop", async () => {
    const gameName = "Ticket to ride";
    await wrapper.setProps({
      gameName,
    });
    const modalText = await wrapper.find("h4").text();
    expect(modalText.includes(gameName)).toBe(true);
  });
});
