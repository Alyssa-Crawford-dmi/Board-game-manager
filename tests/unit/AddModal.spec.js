import AddModal from "@/components/Modals/AddModal.vue";
import Message from "@/components/UI/StatusMessage.vue";
import { mount } from "@vue/test-utils";
import axios from "axios";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import { nextTick } from "vue";
import { fakeGameData } from "../../jest.setup";

const numGames = fakeGameData.data.games.length;

describe("AddModal.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(AddModal, {
      props: { addStatus: { msg: "", error: "" }, gamesList: [] },
    });
  });

  //Components
  it("Has an inputText bound to searchTerm", async () => {
    const input = wrapper.findComponent(InputText);
    const search = "Ticket";
    await input.setValue(search);
    expect(input.exists()).toBe(true);
    expect(wrapper.vm.searchTerm === search).toBe(true);
  });
  it("Has an icon if searchResults contains a game that is in gamesList", async () => {
    await wrapper.setData({ searchResults: fakeGameData.data.games });
    await wrapper.setProps({ gamesList: fakeGameData.data.games });
    const icon = wrapper.find("i");
    expect(icon.exists()).toBe(true);
  });

  //Searching
  it("Makes a call to axios when search pressed", async () => {
    await wrapper.findComponent(Button).trigger("click");
    expect(axios.get).toHaveBeenCalled();
  });
  it("Makes a call to axios when searchTerm changed", async () => {
    const input = wrapper.findComponent(InputText);
    const search = "Ticket";
    await input.setValue(search);
    expect(axios.get).toHaveBeenCalled();
  });
  it("Saves the returned games list to searchResults", async () => {
    await wrapper.vm.search();
    await nextTick();
    fakeGameData.data.games.map((game, index) => {
      expect(game.name).toEqual(wrapper.vm.searchResults[index].name);
    });
  });

  //Adding games
  it("Calling addGame emits the add-game event", async () => {
    wrapper.vm.addGame(fakeGameData.data.games[0], new Event("Click"));
    expect(wrapper.emitted("add-game")[0][0]).toEqual(
      fakeGameData.data.games[0]
    );
  });
  it("Has a message component after addGame is called", async () => {
    wrapper.vm.addGame(fakeGameData.data.games[0], new Event("Click"));
    await nextTick();
    const message = wrapper.findComponent(Message);
    expect(message.exists()).toBe(true);
  });

  //History
  it("When a lastSearch value is passed it sets search term to that value", async () => {
    const lastSearch = "game";
    const wrapperWithProps = mount(AddModal, {
      props: { addStatus: { msg: "", error: "" }, gamesList: [], lastSearch },
    });
    expect(wrapperWithProps.vm.searchTerm).toEqual(lastSearch);
  });
});
