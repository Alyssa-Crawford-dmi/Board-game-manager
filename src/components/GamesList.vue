<template>
  <div class="card">
    <DataView
      :value="gamesList"
      :layout="forceLayout || layout"
      :paginator="true"
      :rows="25"
    >
      <template #header>
        <div class="p-grid p-nogutter p-ai-center vertical-container header">
          <div class="p-col-4 header-content" style="text-align: left">
            <h2>Games List</h2>
          </div>
          <div
            class="p-col-4 header-content"
            style="text-align: center"
            @click="addGames"
          >
            <Button
              @click="addGames"
              label="Add games"
              class="p-button-rounded"
              title="Add games"
              :disabled="!canAddGames"
            />
          </div>
          <div class="p-col-4 header-content" style="text-align: right">
            <ModifiedDataViewLayoutOptions
              v-model="layout"
              v-if="isLargeScreen"
            />
          </div>
        </div>
      </template>

      <template #empty>{{ emptyText }}</template>
      <template #list="slotProps">
        <ListItem
          :gameData="slotProps.data"
          @item-clicked="() => detail(slotProps.data)"
          ><GameActionBtns
            @delete-item="() => deleteItem(slotProps.index)"
            @move-item="() => moveItem(slotProps.index)"
            :disabled="!canAddGames"
            :showMoveText="showActionBtnMoveText"
            :showRemoveText="showActionBtnDeleteText"
            :centerText="false"
        /></ListItem>
      </template>
      <template #grid="slotProps">
        <GridItem
          :gameData="slotProps.data"
          @delete-item="() => deleteItem(slotProps.index)"
          @move-item="() => moveItem(slotProps.index)"
          @item-clicked="() => detail(slotProps.data)"
          @unauthorized-action="unauthorizedAction"
          :disabled="!canAddGames"
        />
      </template>
    </DataView>
  </div>
</template>

<script>
import DataView from "primevue/dataview";
import ModifiedDataViewLayoutOptions from "./modifiedPrimeVue/ModifiedDataViewLayoutOptions.vue";
import GridItem from "./GridItem.vue";
import ListItem from "./ListItem.vue";
import Button from "primevue/button";
import { loginState } from "../utils/auth";
import { windowState } from "../utils/windowSize";
import { activeUserState } from "../utils/activeUser";
import { gamesListState } from "../utils/gameListManager";
import GameActionBtns from "./UI/GameActionBtns.vue";

export default {
  name: "ListHolder",
  components: {
    DataView,
    ModifiedDataViewLayoutOptions,
    Button,
    GridItem,
    ListItem,
    GameActionBtns,
  },
  emits: [
    "add-games",
    "delete-item",
    "game-detail",
    "unauthorized-action",
    "move-item",
  ],
  props: { gamesList: { required: true, type: Array } },
  data() {
    return {
      isLoggedIn: loginState.loggedInUser,
      gamesLoading: gamesListState.isLoading,
      windowWidth: windowState.windowWidth,
      layout: "grid",
    };
  },
  computed: {
    canAddGames() {
      if (
        this.isLoggedIn &&
        this.isLoggedIn === activeUserState.activeUser.value
      ) {
        return true;
      }
      return false;
    },
    emptyText() {
      if (this.gamesLoading) {
        return "Loading...";
      }
      return this.isLoggedIn
        ? "No games yet"
        : "Please login or sign up to get started";
    },
    isLargeScreen() {
      return this.windowWidth > 500;
    },
    forceLayout() {
      return this.windowWidth <= 500 ? "list" : "";
    },
    showActionBtnMoveText() {
      return this.windowWidth > 700;
    },
    showActionBtnDeleteText() {
      return this.windowWidth > 550;
    },
  },
  methods: {
    deleteItem(index) {
      this.$emit("delete-item", index);
    },
    moveItem(index) {
      this.$emit("move-item", index);
    },
    addGames() {
      if (!this.canAddGames) {
        this.$emit("unauthorized-action");
        return;
      }
      this.$emit("add-games");
    },
    detail(game) {
      this.$emit("game-detail", game);
    },
    unauthorizedAction() {
      this.$emit("unauthorized-action");
    },
  },
};
</script>
<style scoped>
h2 {
  font-weight: 650;
}
@media only screen and (max-width: 600px) {
  .header {
    display: flex;
    flex-direction: column;
    align-content: center;
  }
  .header h2 {
    padding: 0;
    font-size: large;
    margin: 0;
  }
  .header-content {
    width: max-content;
    padding-bottom: 0.5rem;
  }
}
</style>