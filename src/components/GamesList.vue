<template>
  <div class="card">
    <DataView :value="gamesList" :layout="layout" :paginator="true" :rows="10">
      <template #header>
        <div class="p-grid p-nogutter p-ai-center vertical-container header">
          <div class="p-col-4 header-content" style="text-align: left">
            <h2>Games List</h2>
          </div>
          <div class="p-col-4 header-content" style="text-align: center">
            <Button
              @click="() => addGames()"
              label="Add games"
              class="p-button-rounded"
              title="Add games"
              :disabled="!canAddGames"
            />
          </div>
          <div
            class="p-col-4 header-content"
            style="text-align: right"
            v-if="bigScreen"
          >
            <ModifiedDataViewLayoutOptions v-model="layout" />
          </div>
        </div>
      </template>

      <template #list="slotProps">
        <ListItem
          :gameData="slotProps.data"
          @delete-item="() => deleteItem(slotProps.index)"
          @item-clicked="() => detail(slotProps.data.id)"
          :disabled="!canAddGames"
        />
      </template>
      <template #grid="slotProps">
        <GridItem
          :gameData="slotProps.data"
          @delete-item="() => deleteItem(slotProps.index)"
          @item-clicked="() => detail(slotProps.data.id)"
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

export default {
  name: "ListHolder",
  components: {
    DataView,
    ModifiedDataViewLayoutOptions,
    Button,
    GridItem,
    ListItem,
  },
  emits: ["add-games", "delete-item", "game-detail"],
  props: { gamesList: { required: true, type: Array } },
  mounted() {
    this.bigScreen = screen.width > 650;
    window.onorientationchange = () => {
      this.bigScreen = screen.width > 650;
    };
  },
  data() {
    return {
      layout: "grid",
      bigScreen: false,
      isLoggedIn: loginState.loggedIn,
    };
  },
  computed: {
    canAddGames() {
      if (this.isLoggedIn) {
        return true;
      }
      return false;
    },
  },
  methods: {
    deleteItem(index) {
      this.$emit("delete-item", index);
    },
    addGames() {
      this.$emit("add-games");
    },
    detail(id) {
      this.$emit("game-detail", id);
    },
    detectOrientationChange() {
      console.log("Detected change");
      this.bigScreen = screen.width > 650;
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