<template>
  <DataView :value="gamesList" :layout="layout" :paginator="true" :rows="9">
    <template #header>
      <div class="p-grid p-nogutter">
        <div class="p-col-6" style="text-align: left">
          <h2>Games List</h2>
        </div>
        <div class="p-col-6" style="text-align: right">
          <DataViewLayoutOptions v-model="layout" />
        </div>
      </div>
    </template>

    <template #list="slotProps">
      <div class="p-col-12">
        <div class="product-list-item">
          <img :src="slotProps.data.thumb_url" :alt="slotProps.data.name" />
          <div class="product-list-detail">
            <div class="product-name">{{ slotProps.data.name }}</div>
          </div>
        </div>
        <DeleteButtonIcon @delete-item="() => deleteItem(slotProps.index)" />
      </div>
    </template>

    <template #grid="slotProps">
      <div class="p-col-12">
        <div class="product-list-item">
          <!-- <img :src="slotProps.data.thumb_url" :alt="slotProps.data.name" /> -->
          <div class="product-list-detail">
            <div class="product-name">{{ slotProps.data.name }}</div>
          </div>
        </div>
        <DeleteButtonIcon @delete-item="() => deleteItem(slotProps.index)" />
      </div>
    </template>
  </DataView>
</template>

<script>
import DataView from "primevue/dataview";
import DataViewLayoutOptions from "primevue/dataviewlayoutoptions";
import DeleteButtonIcon from "./UI/DeleteButtonIcon.vue";

export default {
  name: "ListHolder",
  components: {
    DataView,
    DataViewLayoutOptions,
    DeleteButtonIcon,
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