<template>
  <Button
    @click="(e) => deleteItem(e)"
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
    deleteItem(e) {
      e.stopPropagation();
      this.$emit("delete-item");
    },
  },
};
</script>
