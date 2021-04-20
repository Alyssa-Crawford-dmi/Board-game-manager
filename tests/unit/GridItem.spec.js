import GridItem from "@/components/GridItem";
import { mount } from "@vue/test-utils";

const gameData = { name: "game1", images: [] };

describe("GridItem.vue", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(GridItem, { props: { gameData } });
  });
  it("Emits delete-item when the GameActionBtns emits delete-item", async () => {
    const button = wrapper.find("i");
    await button.trigger("click");
    expect(wrapper.emitted("delete-item")).toBeTruthy();
  });
  it("Emits item-clicked when the element is clicked", async () => {
    await wrapper.trigger("click");
    expect(wrapper.emitted("item-clicked")).toBeTruthy();
  });
});
