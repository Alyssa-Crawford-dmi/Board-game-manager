<template>
  <div class="card">
    <DataView :value="gamesList" :layout="layout" :paginator="true" :rows="9">
      <template #header>
        <div class="p-grid p-nogutter data-header">
          <div class="p-col-6" style="text-align: left">
            <h2>Games List</h2>
          </div>
          <div class="p-col-6" style="text-align: right">
            <DataViewLayoutOptions v-model="layout" />
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
import DataViewLayoutOptions from "primevue/dataviewlayoutoptions";
import GridItem from "./GridItem.vue";
import ListItem from "./ListItem.vue";

export default {
  name: "ListHolder",
  components: {
    DataView,
    DataViewLayoutOptions,

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
  },
};
</script>
<style scoped>
h2 {
  font-weight: 650;
}
.data-header {
  background-clip: border-box;
  background-color: var(--light-purple-gray);
}
</style>