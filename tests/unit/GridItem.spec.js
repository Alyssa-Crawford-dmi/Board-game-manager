import GridItem from "@/components/GridItem";
import GameActionBtns from "@/components/UI/GameActionBtns";
import { mount } from "@vue/test-utils";

const gameData = { name: "game1", images: [] };

describe("GridItem.vue", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(GridItem, { props: { gameData } });
  });
  it("Emits delete-item when the GameActionBtns emits delete-item", () => {
    const button = wrapper.findComponent(GameActionBtns);
    button.vm.$emit("delete-item");
    expect(wrapper.emitted("delete-item")).toBeTruthy();
  });
  it("Emits item-clicked when the element is clicked", async () => {
    await wrapper.trigger("click");
    expect(wrapper.emitted("item-clicked")).toBeTruthy();
  });
});
