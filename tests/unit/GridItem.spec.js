import { mount } from "@vue/test-utils";
import GridItem from "@/components/GridItem";
import RemoveGameButton from "@/components/UI/RemoveGameButton";

const gameData = { name: "game1", images: [] };

describe("GridItem.vue", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(GridItem, { props: { gameData } });
  });
  it("Emits delete-item when the removeGameButton emits delete-item", () => {
    const button = wrapper.findComponent(RemoveGameButton);
    button.vm.$emit("delete-item");
    expect(wrapper.emitted("delete-item")).toBeTruthy();
  });
  it("Emits item-clicked when the element is clicked", async () => {
    await wrapper.trigger("click");
    expect(wrapper.emitted("item-clicked")).toBeTruthy();
  });
  it("Does not emit item-clicked when the removeGameButton is clicked", async () => {
    const button = wrapper.findComponent(RemoveGameButton);
    await button.trigger("click");
    expect(wrapper.emitted("item-clicked")).toBeFalsy();
    expect(wrapper.emitted("delete-item")).toBeTruthy();
  });
});
