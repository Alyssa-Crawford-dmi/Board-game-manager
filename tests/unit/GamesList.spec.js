import { mount } from "@vue/test-utils";
import GamesList from "@/components/GamesList.vue";
import DataView from "primevue/dataview";

const games = [
  { name: "game1", images: [] },
  { name: "game2", images: [] },
  { name: "game3", images: [] },
];
const clickIndex = 1;

describe("GamesList.vue", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(GamesList, { props: { GamesList: games } });
  });
  it("Has a DataView", () => {
    const dataView = wrapper.findComponent(DataView);
    expect(dataView.exists()).toBe(true);
  });
  it("Emits delete-item with the value passed when deleteItem is called", () => {
    const expectedEmittedPayload = [clickIndex];
    wrapper.vm.deleteItem(clickIndex);
    expect(wrapper.emitted("delete-item")[0]).toEqual(expectedEmittedPayload);
  });
});
