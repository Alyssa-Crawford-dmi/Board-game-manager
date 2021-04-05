import ListItem from "@/components/ListItem";
import { mount } from "@vue/test-utils";

const gameData = { name: "game1", images: [] };

describe("ListItem.vue", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(ListItem, { props: { gameData } });
  });
  it("Emits item-clicked when the element is clicked", async () => {
    await wrapper.trigger("click");
    expect(wrapper.emitted("item-clicked")).toBeTruthy();
  });
});
