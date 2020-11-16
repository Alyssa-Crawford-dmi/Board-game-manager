import { mount } from "@vue/test-utils";
import Home from "@/views/Home.vue";
import GamesList from "@/components/GamesList.vue";
import Dialog from "primevue/dialog";
import DeleteModal from "@/components/Modals/DeleteModal.vue";
import AddModal from "@/components/Modals/AddModal.vue";
import axios from "axios";

const fakeResult = {
  data: {
    games: [
      { name: "game1", images: [] },
      { name: "game2", images: [] },
      { name: "game3", images: [] },
    ],
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
  it("Has a dialog", async () => {
    await wrapper.setData({ showModal: true });
    const dialog = wrapper.findComponent(Dialog);
    expect(dialog.exists()).toBe(true);
  });

  //Handle events emitted by dialogs

  it("On delete-confirmed the modal is no longer shown", async () => {
    await wrapper.setData({
      showModal: true,
      deleteModal: true,
    });
    const modal = wrapper.findComponent(DeleteModal);
    await modal.vm.$emit("delete-confirmed");
    expect(wrapper.vm.showModal).toBe(false);
  });

  //Handling events emitted by gamesList
  it("On delete-item opens a dialog and sets indexToRemove", async () => {
    const gamesList = wrapper.findComponent(GamesList);
    await gamesList.vm.$emit("delete-item", clickIndex);
    const dialog = wrapper.findComponent(Dialog);
    expect(dialog.exists()).toBe(true);
    expect(wrapper.vm.indexToRemove).toBe(clickIndex);
  });

  it("On add-games opens an addModal", async () => {
    const gamesList = wrapper.findComponent(GamesList);
    await gamesList.vm.$emit("add-games", clickIndex);
    const addModal = wrapper.findComponent(AddModal);
    expect(addModal.exists()).toBe(true);
  });

  //Removing list items
  it("Removes the game at indexToRemove when delete confirmed", async () => {
    const replacingElm = wrapper.vm.gamesList[clickIndex + 1];
    await wrapper.setData({
      indexToRemove: clickIndex,
      showModal: true,
      deleteModal: true,
    });
    const modal = wrapper.findComponent(DeleteModal);
    await modal.vm.$emit("delete-confirmed");
    expect(wrapper.vm.gamesList).toHaveLength(numGames - 1);
    expect(wrapper.vm.gamesList[clickIndex] === replacingElm).toBe(true);
  });

  it("Does not remove any elements if indexToRemove is -1", async () => {
    await wrapper.setData({
      showModal: true,
      deleteModal: true,
    });
    const modal = wrapper.findComponent(DeleteModal);
    await modal.vm.$emit("delete-confirmed");
    expect(wrapper.vm.gamesList).toHaveLength(numGames);
  });

  //Game list updated on load
  it("Loading listHolder causes an api call to be made which updates the state", async () => {
    expect(wrapper.vm.gamesList).toHaveLength(numGames);
  });

  it("Passes the name of the game to remove to deleteModal", async () => {
    await wrapper.setData({
      showModal: true,
      indexToRemove: clickIndex,
      deleteModal: true,
    });
    const dialog = wrapper.findComponent(DeleteModal);
    expect(dialog.props("gameName")).toBe(
      fakeResult.data.games[clickIndex].name
    );
  });
});
