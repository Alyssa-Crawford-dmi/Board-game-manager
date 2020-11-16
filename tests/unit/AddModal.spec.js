import { mount } from "@vue/test-utils";
import AddModal from "@/components/Modals/AddModal.vue";
import axios from "axios";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import { nextTick } from "vue";
import SearchListItem from "@/components/SearchListItem.vue";

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

describe("AddModal.vue", () => {
  let wrapper;
  axios.get.mockResolvedValue(fakeResult);

  beforeEach(() => {
    wrapper = mount(AddModal, { props: { addStatus: { msg: "", error: "" } } });
  });

  //Basic components
  it("Has an inputText bound to searchTerm", async () => {
    const input = wrapper.findComponent(InputText);
    const search = "Ticket";
    await input.setValue(search);
    expect(input.exists()).toBe(true);
    expect(wrapper.vm.searchTerm === search).toBe(true);
  });

  it("Makes a call to axios when search pressed", async () => {
    await wrapper.findComponent(Button).trigger("click");
    expect(axios.get).toHaveBeenCalled();
  });

  it("Saves the returned games list to gamesList", async () => {
    await wrapper.vm.search();
    await nextTick();
    fakeResult.data.games.map((game, index) => {
      expect(game.name).toEqual(wrapper.vm.gamesList[index].name);
    });
  });

  it("Creates one SearchListItem per game in gamesList", async () => {
    await wrapper.setData({ gamesList: fakeResult.data.games });
    const listItems = wrapper.findAllComponents(SearchListItem);
    expect(listItems).toHaveLength(numGames);
  });

  it("Calling addGame emits the add-game event", async () => {
    wrapper.vm.addGame(fakeResult.data.games[0]);
    expect(wrapper.emitted("add-game")[0][0]).toEqual(fakeResult.data.games[0]);
  });
});
