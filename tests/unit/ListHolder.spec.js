import { mount } from "@vue/test-utils";
import ListHolder from "@/components/ListHolder.vue";
import ListItem from "@/components/ListItem.vue";
import GridItem from "@/components/GridItem.vue";
import Modal from "@/components/Modals/BaseModal.vue";
import flushPromises from "flush-promises";
import axios from "axios";

const fakeResult = {
  data: {
    games: [{ name: "game1" }, { name: "game2" }, { name: "game3" }],
  },
};
const numGames = fakeResult.data.games.length;
const clickIndex = 1;

describe("App.vue", () => {
  let listWrapper;
  let gridWrapper;
  axios.get.mockResolvedValue(fakeResult);

  beforeEach(async () => {
    gridWrapper = mount(ListHolder, { props: { showAsList: false } });
    listWrapper = mount(ListHolder, { props: { showAsList: true } });
    await flushPromises();
  });

  //Basic componets
  it("Has a ListItem componet when showAsList prop is true", () => {
    const listItem = listWrapper.findComponent(ListItem);
    expect(listItem.exists()).toBe(true);
  });

  it("Has a GridItem componet when showAsList prop is false", () => {
    const gridItem = gridWrapper.findComponent(GridItem);
    expect(gridItem.exists()).toBe(true);
  });

  it("Has as many ListItem componets as length of gamesList", () => {
    const listItems = listWrapper.findAllComponents(ListItem);
    expect(listItems).toHaveLength(numGames);
  });

  it("Has as many GridItem componets as length of gamesList", () => {
    const gridItems = gridWrapper.findAllComponents(GridItem);
    expect(gridItems).toHaveLength(numGames);
  });

  it("Has a modal componet", async () => {
    await listWrapper.setData({ showModal: true });
    const modal = listWrapper.findComponent(Modal);
    expect(modal.exists()).toBe(true);
  });

  //Clicking on modal causes it to go away
  it("Clicking on the backdrop causes it to no longer be in the DOM", async () => {
    await listWrapper.setData({ showModal: true });
    await listWrapper.findComponent(Modal).trigger("click");
    const modal = listWrapper.findComponent(Modal);
    expect(modal.exists()).toBe(false);
  });
  it("The first button in the modal causes the modal to be removed from the DOM", async () => {
    await listWrapper.setData({ showModal: true });
    await listWrapper
      .findComponent(Modal)
      .find("button")
      .trigger("click");
    const modal = listWrapper.findComponent(Modal);
    expect(modal.exists()).toBe(false);
  });
  it("The second button in the modal causes the modal to be removed from the DOM", async () => {
    await listWrapper.setData({ showModal: true });
    await listWrapper
      .findComponent(Modal)
      .find("button.remove")
      .trigger("click");
    const modal = listWrapper.findComponent(Modal);
    expect(modal.exists()).toBe(false);
  });

  //Clicking on items
  it("Opens the modal when an list elment is clicked", async () => {
    await listWrapper.findComponent(ListItem).trigger("click");
    const modal = listWrapper.findComponent(Modal);
    expect(modal.exists()).toBe(true);
  });

  it("Opens the modal when an grid elment is clicked", async () => {
    await gridWrapper.findComponent(GridItem).trigger("click");
    const modal = gridWrapper.findComponent(Modal);
    expect(modal.exists()).toBe(true);
  });

  it("Each grid item stores recives its list index as a prop", () => {
    const item = gridWrapper.findAllComponents(GridItem)[clickIndex];
    expect(item.props("index")).toBe(clickIndex);
  });

  it("Each list item stores recives its list index as a prop", () => {
    const item = listWrapper.findAllComponents(ListItem)[clickIndex];
    expect(item.props("index")).toBe(clickIndex);
  });

  it("Clicking on a grid item sets indexToRemove to the index of that element", async () => {
    await gridWrapper.findAllComponents(GridItem)[clickIndex].trigger("click");
    expect(gridWrapper.vm.indexToRemove).toBe(clickIndex);
  });

  it("Clicking on a list item sets indexToRemove to the index of that element", async () => {
    await listWrapper.findAllComponents(ListItem)[clickIndex].trigger("click");
    expect(listWrapper.vm.indexToRemove).toBe(clickIndex);
  });

  //Removing list items
  it("Removes the game at indexToRemove when delete confirmed", async () => {
    const replacingElm = listWrapper.vm.gamesList[clickIndex + 1];
    await listWrapper.setData({ showModal: true, indexToRemove: clickIndex });
    await listWrapper
      .findComponent(Modal)
      .find("button.remove")
      .trigger("click");
    expect(listWrapper.vm.gamesList).toHaveLength(numGames - 1);
    expect(listWrapper.vm.gamesList[clickIndex] === replacingElm).toBe(true);
  });

  //Game list updated on load
  it("Loading listHolder causes an api call to be made which updates the state", async () => {
    expect(listWrapper.vm.gamesList).toHaveLength(numGames);
  });
});
