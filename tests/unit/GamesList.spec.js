import GamesList from "@/components/GamesList.vue";
import GridItem from "@/components/GridItem";
import ListItem from "@/components/ListItem";
import { mount } from "@vue/test-utils";
import Button from "primevue/button";
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
    wrapper = mount(GamesList, { props: { gamesList: games } });
  });
  //Components
  it("Has a DataView", () => {
    const dataView = wrapper.findComponent(DataView);
    expect(dataView.exists()).toBe(true);
  });
  it("Has at least one list item if layout set to list", async () => {
    await wrapper.setData({ layout: "list" });
    const listItem = wrapper.findComponent(ListItem);
    expect(listItem.exists()).toBe(true);
  });
  it("Has at least one grid item if layout set to grid", async () => {
    await wrapper.setData({ layout: "grid" });
    const gridItem = wrapper.findComponent(GridItem);
    expect(gridItem.exists()).toBe(true);
  });

  //Passing data
  it("Passes the game data from games list to each corresponding gridItem", () => {
    const index = 0;
    const gridItem = wrapper.findAllComponents(GridItem)[index];
    expect(gridItem.vm.gameData).toStrictEqual(games[index]);
  });

  //Emitted events
  it("Emits delete-item with the value passed when deleteItem is called", () => {
    const expectedEmittedPayload = [clickIndex];
    wrapper.vm.deleteItem(clickIndex);
    expect(wrapper.emitted("delete-item")[0]).toEqual(expectedEmittedPayload);
  });
  it("Emits game-detail with the value passed when detail is called", async () => {
    const fakeId = "1234";
    wrapper.vm.detail(fakeId);
    expect(wrapper.emitted("game-detail")[0][0]).toEqual(fakeId);
  });
  it("Emits add-games when add games button pressed", async () => {
    await wrapper.findComponent(Button).trigger("click");
    expect(wrapper.emitted("add-games")).toBeTruthy();
  });
});
