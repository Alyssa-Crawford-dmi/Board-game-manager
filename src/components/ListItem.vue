<template>
  <div class="p-col-12">
    <div class="product-list-item">
      <img :src="slotProps.data.thumb_url" :alt="slotProps.data.name" />
      <div class="product-list-detail">
        <div class="product-name">{{ slotProps.data.name }}</div>
      </div>
    </div>
    <DeleteButtonIcon @delete-item="deleteItem" />
  </div>
</template>
<script>
import DeleteButtonIcon from "./UI/DeleteButtonIcon.vue";

export default {
  name: "ListItem",
  props: ["gameData", "gameIndex"],
  components: {
    DeleteButtonIcon,
  },
  methods: {
    deleteItem() {
      this.$emit("delete-item", this.gameIndex);
    },
  },
};
</script>
<style scoped>
div {
  background-color: purple;
}
</style>