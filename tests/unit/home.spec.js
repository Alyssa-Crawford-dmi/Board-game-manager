import { mount } from "@vue/test-utils";
import Home from "@/views/Home.vue";
import GamesList from "@/components/GamesList.vue";
import Button from "primevue/button";
import Modal from "@/components/Modals/BaseModal.vue";
import axios from "axios";

const fakeResult = {
  data: {
    games: [{ name: "game1" }, { name: "game2" }, { name: "game3" }],
  },
};
const numGames = fakeResult.data.games.length;
const clickIndex = 1;

describe("Home.vue", () => {
  axios.get.mockResolvedValue(fakeResult);

  let wrapper;
  beforeEach(() => {
    wrapper = mount(Home);
  });

  //Basic components
  it("Has a GamesList", () => {
    const gamesList = wrapper.findComponent(GamesList);
    expect(gamesList.exists()).toBe(true);
  });
  it("Has a Modal", async () => {
    await wrapper.setData({ showModal: true });
    const modal = wrapper.findComponent(Modal);
    expect(modal.exists()).toBe(true);
  });

  //Clicking on modal causes it to go away
  it("Clicking on the backdrop causes it to no longer be in the DOM", async () => {
    await wrapper.setData({ showModal: true });
    await wrapper.findComponent(Modal).trigger("click");
    const modal = wrapper.findComponent(Modal);
    expect(modal.exists()).toBe(false);
  });
  it("The first button in the modal causes the modal to be removed from the DOM", async () => {
    await wrapper.setData({ showModal: true });
    await wrapper
      .findComponent(Modal)
      .findComponent(Button)
      .trigger("click");
    const modal = wrapper.findComponent(Modal);
    expect(modal.exists()).toBe(false);
  });
  it("The second button in the modal causes the modal to be removed from the DOM", async () => {
    await wrapper.setData({ showModal: true });
    await wrapper
      .findComponent(Modal)
      .findAllComponents(Button)[1]
      .trigger("click");
    const modal = wrapper.findComponent(Modal);
    expect(modal.exists()).toBe(false);
  });

  //Handling events emitted by gamesList
  it("Opens a modal and sets index to remove based on event emitted by games list", async () => {
    const gamesList = wrapper.findComponent(GamesList);
    await gamesList.vm.$emit("delete-item", clickIndex);
    const modal = wrapper.findComponent(Modal);
    expect(modal.exists()).toBe(true);
    expect(wrapper.vm.indexToRemove).toBe(clickIndex);
  });

  //Removing list items
  it("Removes the game at indexToRemove when delete confirmed", async () => {
    const replacingElm = wrapper.vm.gamesList[clickIndex + 1];
    await wrapper.setData({
      showModal: true,
      indexToRemove: clickIndex,
    });
    await wrapper
      .findComponent(Modal)
      .findAllComponents(Button)[1]
      .trigger("click");
    expect(wrapper.vm.gamesList).toHaveLength(numGames - 1);
    expect(wrapper.vm.gamesList[clickIndex] === replacingElm).toBe(true);
  });

  //Game list updated on load
  it("Loading listHolder causes an api call to be made which updates the state", async () => {
    expect(wrapper.vm.gamesList).toHaveLength(numGames);
  });
});
