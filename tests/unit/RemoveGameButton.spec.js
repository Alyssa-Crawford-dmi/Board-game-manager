import { mount } from "@vue/test-utils";
import RemoveGameButton from "@/components/UI/RemoveGameButton.vue";
import Button from "primevue/button";

describe("Message.vue", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(RemoveGameButton);
  });

  it("Clicking on the button emits delete-item", async () => {
    await wrapper.findComponent(Button).trigger("click");
    expect(wrapper.emitted("delete-item")).toBeTruthy();
  });
});
