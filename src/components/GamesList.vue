<template>
  <div class="card">
    <DataView :value="gamesList" :layout="layout" :paginator="true" :rows="9">
      <template #header>
        <div class="p-grid p-nogutter p-ai-center vertical-container">
          <div class="p-col-4" style="text-align: left">
            <h2>Games List</h2>
          </div>
          <div class="p-col-4" style="text-align: center">
            <Button
              @click="() => addGames()"
              label="Add games"
              class="p-button-rounded"
              title="Delete Item"
            />
          </div>
          <div class="p-col-4" style="text-align: right">
            <ModifiedDataViewLayoutOptions v-model="layout" />
          </div>
        </div>
      </template>

      <template #list="slotProps">
        <ListItem
          :gameData="slotProps.data"
          @delete-item="() => deleteItem(slotProps.index)"
        />
      </template>
      <template #grid="slotProps">
        <GridItem
          :gameData="slotProps.data"
          @delete-item="() => deleteItem(slotProps.index)"
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

export default {
  name: "ListHolder",
  components: {
    DataView,
    ModifiedDataViewLayoutOptions,
    Button,
    GridItem,
    ListItem,
  },
  props: ["gamesList"],
  data() {
    return {
      layout: "grid",
    };
  },
  methods: {
    deleteItem(index) {
      this.$emit("delete-item", index);
    },
    addGames() {
      this.$emit("add-games");
    },
  },
};
</script>
<style scoped>
h2 {
  font-weight: 650;
}
</style>