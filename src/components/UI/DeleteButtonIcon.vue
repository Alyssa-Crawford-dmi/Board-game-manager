<template>
  <Button
    @click="() => deleteItem()"
    icon="pi pi-times"
    class="p-button-rounded p-button-danger p-button-outlined"
    title="Delete Item"
  />
</template>

<script>
import Button from "primevue/button";

export default {
  components: {
    Button,
  },
  methods: {
    deleteItem() {
      this.$emit("delete-item");
    },
  },
};
</script>