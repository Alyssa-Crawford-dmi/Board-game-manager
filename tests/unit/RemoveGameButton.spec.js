import GameActionBtns from "@/components/UI/GameActionBtns.vue";
import { mount } from "@vue/test-utils";
import Button from "primevue/button";

describe("Message.vue", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(GameActionBtns);
  });

  it("Clicking on the button emits delete-item", async () => {
    await wrapper.findComponent(Button).trigger("click");
    expect(wrapper.emitted("delete-item")).toBeTruthy();
  });
});
