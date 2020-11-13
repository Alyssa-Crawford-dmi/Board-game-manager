<template>
  <Button
    @click="() => deleteItem()"
    label="Remove game"
    class="p-button-danger p-button-text"
    title="Delete Item"
  />
</template>

<script>
import Button from "primevue/button";

export default {
  components: {
    Button,
  },
  emits: ["delete-item"],
  methods: {
    deleteItem() {
      this.$emit("delete-item");
    },
  },
};
</script>
