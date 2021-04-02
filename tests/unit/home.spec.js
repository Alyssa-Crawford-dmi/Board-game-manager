import GamesList from "@/components/GamesList.vue";
import AddModal from "@/components/Modals/AddModal.vue";
import ConfirmModal from "@/components/Modals/ConfirmModal.vue";
import DetailModal from "@/components/Modals/DetailModalWrapper.vue";
import Home from "@/views/Home.vue";
import { mount } from "@vue/test-utils";
import Dialog from "primevue/dialog";
import { nextTick } from "vue";
import { fakeGameData } from "../../jest.setup";
import { activeUserState } from "../../src/utils/activeUser";
import { basicActions, modalTypes } from "../../src/utils/modalTypes.js";

const numGames = fakeGameData.data.games.length;
const clickIndex = 1;

describe("Home.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Home, {
      global: {
        mocks: {
          $route: { query: {} },
        },
      },
    });
    const uniqueUser = `AC${+Math.random() * 100}`;
    activeUserState.setActiveUserAndListMode(uniqueUser);
  });

  // If this test fails other tests are likely to fail in more subtle
  // ways because the setup is different than expected
  it("Has as many games in gamesList as in fakeGameData", () => {
    expect(wrapper.vm.gamesList.length).toEqual(numGames);
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
  it("On action-confirmed the modal is no longer shown", async () => {
    await wrapper.setData({
      showModal: true,
      selectedModalType: modalTypes.BASIC_CONFIRM,
    });
    const modal = wrapper.findComponent(ConfirmModal);
    await modal.vm.$emit("action-confirmed");
    expect(wrapper.vm.showModal).toBe(false);
  });
  it("On add-game a new game is added to the list unless it was already in the list", async () => {
    const oldLength = wrapper.vm.gamesList.length;
    await wrapper.setData({
      showModal: true,
      selectedModalType: modalTypes.ADD,
    });
    const modal = wrapper.findComponent(AddModal);
    await modal.vm.$emit("add-game", { id: "3", name: "game3", images: [] });
    await modal.vm.$emit("add-game", { id: "4", name: "game4", images: [] });
    expect(wrapper.vm.gamesList.length).toBe(oldLength + 1);
    expect(
      wrapper.vm.gamesList.some((gameInList) => gameInList.id === "4")
    ).toBe(true);
    expect(
      wrapper.vm.gamesList.some((gameInList) => gameInList.id === "3")
    ).toBe(true);
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
    await gamesList.vm.$emit("add-games");
    const addModal = wrapper.findComponent(AddModal);
    expect(addModal.exists()).toBe(true);
  });

  it("On game-detail opens an detailModal and sets detailGame to the payload of the emitted event", async () => {
    const game = fakeGameData.data.games[clickIndex];
    const gamesList = wrapper.findComponent(GamesList);
    await gamesList.vm.$emit("game-detail", game);
    const detailModal = wrapper.findComponent(DetailModal);
    expect(detailModal.exists()).toBe(true);
    expect(wrapper.vm.detailGame).toEqual(game);
  });

  //Removing list items
  it("Removes the game at indexToRemove when delete confirmed", async () => {
    const replacingElm = wrapper.vm.gamesList[clickIndex + 1];
    await wrapper.setData({
      indexToRemove: clickIndex,
      showModal: true,
      selectedModalType: modalTypes.BASIC_CONFIRM,
      action: basicActions.REMOVE,
    });
    const modal = wrapper.findComponent(ConfirmModal);
    await modal.vm.$emit("action-confirmed");
    expect(wrapper.vm.gamesList).toHaveLength(numGames - 1);
    expect(wrapper.vm.gamesList[clickIndex] === replacingElm).toBe(true);
  });

  it("Does not remove any elements if indexToRemove is -1", async () => {
    await wrapper.setData({
      showModal: true,
      selectedModalType: modalTypes.BASIC_CONFIRM,
      action: basicActions.REMOVE,
    });
    const modal = wrapper.findComponent(ConfirmModal);
    await modal.vm.$emit("action-confirmed");
    expect(wrapper.vm.gamesList).toHaveLength(numGames);
  });

  it("Passes the name of the game to remove to ConfirmModal", async () => {
    await wrapper.setData({
      showModal: true,
      indexToRemove: clickIndex,
      selectedModalType: modalTypes.BASIC_CONFIRM,
    });
    const dialog = wrapper.findComponent(ConfirmModal);
    expect(dialog.props("gameName")).toBe(
      fakeGameData.data.games[clickIndex].name
    );
  });

  //State diagram between modals
  it("Opening a detailModal when the active modal is an addModal saves the current search string to lastSearch", async () => {
    const search = "Game";
    await wrapper.setData({
      showModal: true,
      selectedModalType: modalTypes.ADD,
    });
    const modal = wrapper.findComponent(AddModal);
    await modal.vm.$emit("game-detail", { id: "1" }, search);
    expect(wrapper.vm.lastSearch).toEqual(search);
  });

  it("Clears last search when the add modal is closed", async () => {
    await wrapper.setData({
      showModal: false,
      selectedModalType: modalTypes.ADD,
    });
    expect(wrapper.vm.lastSearch).toEqual("");
  });
  it("Closing the detail modal does not change lastSearch", async () => {
    const lastSearch = "game";
    await wrapper.setData({
      showModal: false,
      selectedModalType: modalTypes.DETAIL,
      lastSearch,
      detailGame: { id: "1" },
    });
    expect(wrapper.vm.lastSearch).toEqual(lastSearch);
  });
  it("Opens the add modal if the detail modal was closed and lastSearch is not empty", async () => {
    const lastSearch = "game";
    await wrapper.setData({
      showModal: true,
      selectedModalType: modalTypes.DETAIL,
      lastSearch,
      detailGame: { id: "1" },
    });
    await wrapper.setData({
      showModal: false,
    });
    await nextTick();
    const modal = wrapper.findComponent(AddModal);
    expect(modal.exists()).toBe(true);
  });
});
