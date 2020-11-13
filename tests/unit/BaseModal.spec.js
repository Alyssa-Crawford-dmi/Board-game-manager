import { mount } from "@vue/test-utils";
import Modal from "@/components/Modals/BaseModal.vue";
import Button from "primevue/button";

describe("BaseModal.vue", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(Modal);
  });

  it("Clicking on the modal itself emits no events", async () => {
    await wrapper.trigger("click");
    expect(wrapper.emitted("close-modal")).toBeFalsy();
  });
  it("Clicking on the backdrop emits close-modal", async () => {
    await wrapper.find("div.Backdrop").trigger("click");
    expect(wrapper.emitted("close-modal")).toBeTruthy();
  });
  it("Clicking on the button emits close-modal", async () => {
    await wrapper.findComponent(Button).trigger("click");
    expect(wrapper.emitted("close-modal")).toBeTruthy();
  });
});
