import { mount } from "@vue/test-utils";
import Message from "@/components/UI/Message_real.vue";
import Button from "primevue/button";

describe("Message.vue", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(Message);
  });

  it("Clicking on the button emits dismiss-message", async () => {
    await wrapper.findComponent(Button).trigger("click");
    expect(wrapper.emitted("dismiss-message")).toBeTruthy();
  });
});
