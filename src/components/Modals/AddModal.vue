<template>
  <div class="outer-container">
    <div id="scroll-marker"></div>
    <div class="search-header">
      <div class="search-inputs">
        <span class="p-input-icon-left search-span">
          <i class="pi pi-search" />
          <InputText
            type="text"
            v-model="searchTerm"
            placeholder="Ticket to Ride"
            class="search-input-field p-inputtext-lg"
            autofocus
            @keyup.enter="search"
          />
        </span>
        <div class="p-field-checkbox filter-container">
          <Checkbox id="showExisting" v-model="showExisting" :binary="true" />
          <label for="showExisting">Show games already in the list</label>
        </div>
        <StatusMessage
          :searchResultsLength="searchResults.length"
          :showNoResultsError="showNoResultsError"
          :resultsPage="page"
          :gameAdded="gameAdded"
        />
      </div>
      <Button
        @click="search"
        label="Search"
        class="p-button-raised p-button-text search-button p-button-lg p-button-rounded"
        title="Search"
      />
    </div>
    <div class="modal-contents">
      <template v-for="game in searchResults" :key="game.id">
        <SearchListItem
          :gameData="game"
          @item-clicked="() => detail(game)"
          v-if="!(!showExisting && gamesListContains(game))"
        >
          <i
            v-if="gamesListContains(game)"
            class="pi pi-check green"
            title="Game already in list"
          />
          <Button
            v-else
            @click="(e) => addGame(game, e)"
            icon="pi pi-plus"
            class="p-button-rounded"
            title="Add game"
          />
        </SearchListItem>
      </template>
      <div class="action-buttons" v-if="searchResults.length !== 0 || page > 0">
        <Button
          @click="() => changePage(-1)"
          class="p-button-raised p-button-text p-button-rounded"
          title="Previous"
          label="Previous"
          :disabled="page === 0"
        />
        <Button
          @click="() => changePage(1)"
          class="p-button-raised p-button-text p-button-rounded"
          title="Next"
          label="Next"
          :disabled="searchResults.length !== 10"
        />
      </div>
    </div>
  </div>
</template>
<script>
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import { getGamesByName } from "../../apiInteractions/boardGameAtlas";
import SearchListItem from "../SearchListItem";
import StatusMessage from "../UI/StatusMessage";
import Checkbox from "primevue/checkbox";
// import mitt from "mitt";

export default {
  name: "AddModal",
  emits: ["add-game", "game-detail", "close-modal"],
  components: {
    InputText,
    Button,
    SearchListItem,
    StatusMessage,
    Checkbox,
  },
  props: {
    addStatus: Object,
    gamesList: { required: true, type: Array },
    lastSearch: { type: String, default: "" },
    lastPage: { type: Number, default: 0 },
  },
  data: () => {
    return {
      searchTerm: "",
      searchResults: [],
      gameAdded: 0,
      debounce: null,
      page: 0,
      showNoResultsError: false,
      showExisting: true,
    };
  },
  created() {
    this.searchTerm = this.lastSearch;
    this.page = this.lastPage;
    clearTimeout(this.debounce);
    this.search();
    // console.log("Just print");
    // const emitter = mitt();
    // this.$router.beforeEach((to, from, next) => {
    //   console.log("never naviagate away");
    //   this.back();
    //   next(false);
    // });
    // emitter.on("hook:destroyed", () => {
    //   unregisterRouterGuard();
    // });
    // emitter.on("*", (type, e) => console.log(type, e));
  },
  beforeUnmount() {
    clearTimeout(this.debounce);
  },
  watch: {
    searchTerm: function () {
      clearTimeout(this.debounce);
      this.showNoResultsError = false;

      this.debounce = setTimeout(async () => {
        this.page = 0;
        await this.search();
        this.showNoResultsError = true;
      }, 300);
    },
  },
  methods: {
    async search() {
      this.searchResults = await getGamesByName(this.searchTerm, this.page);
      this.gameAdded = 0;
    },
    addGame(game, e) {
      e.stopPropagation();
      this.$emit("add-game", game);
      this.gameAdded = this.gameAdded + 1;
    },
    gamesListContains(game) {
      return this.gamesList.some((gameInList) => game.id === gameInList.id);
    },
    detail(game) {
      this.$emit("game-detail", game, this.searchTerm, this.page);
    },
    async changePage(change) {
      if (change === -1 && this.page === 0) {
        return;
      }
      this.page = this.page + change;
      await this.search();
      document.getElementById("scroll-marker").scrollIntoView();
    },
    back() {
      console.log("Closing");
      this.$emit("close-modal");
    },
  },
};
</script>
<style scoped>
.outer-container {
  position: relative;
}
.search-button {
  margin-left: 1rem;
}
.search-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1rem;

  position: sticky;
  top: 0;
  z-index: 200;
  background-color: var(--light-purple-gray);
  width: 100%;
}
.modal-contents {
  padding: 0;
  margin: 0 0 1rem 0;
  width: 100%;
}
p {
  text-align: center;
  font-size: large;
}
.green {
  color: forestgreen;
  font-size: large;
}
.action-buttons {
  display: flex;
  justify-content: space-around;
  margin: 0rem;
}
#scroll-marker {
  padding: 0;
  margin: 0;
}
.p-field-checkbox {
  padding-top: 0.25rem;
}
.search-inputs {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  flex: 1;
  margin: 0;
}
.search-input-field {
  width: 100%;
}
.search-span {
  width: 100%;
  flex: 1;
}
.filter-container {
  margin-bottom: 0.2rem;
}
@media screen and (max-width: 700px) {
  .search-header {
    flex-direction: column;
    align-items: center;
  }
  .search-inputs {
    width: 100%;
  }
}
</style>
