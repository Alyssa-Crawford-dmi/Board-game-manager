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
        <Button
          @click="() => deleteItem(slotProps.index)"
          icon="pi pi-times"
          class="p-button-rounded p-button-secondary p-button-outlined"
          title="Delete Item"
        />
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
        <Button
          @click="() => deleteItem(slotProps.index)"
          icon="pi pi-times"
          class="p-button-rounded p-button-secondary p-button-outlined"
          title="Delete Item"
        />
      </div>
    </template>
  </DataView>
</template>

<script>
import DataView from "primevue/dataview";
import DataViewLayoutOptions from "primevue/dataviewlayoutoptions";
import Button from "primevue/button";

export default {
  name: "ListHolder",
  components: {
    DataView,
    DataViewLayoutOptions,
    Button,
  },
  props: ["gamesList"],
  data() {
    return {
      layout: "grid",
    };
  },
  methods: {
    deleteItem(index) {
      this.$emit("delete-clicked", index);
    },
  },
};
</script>