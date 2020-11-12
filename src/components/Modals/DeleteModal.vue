<template>
  <div>
    <h4>
      Are you sure you like like to remove "{{ gameName }}" from the list?
    </h4>
    <div class="buttons">
      <Button
        label="Cancel"
        class="p-button-raised p-button-secondary p-button-text"
        @click="(e) => closeModal(e)"
        style="margin-right: 30px"
      />
      <Button
        label="Remove"
        class="p-button-raised p-button-danger p-button-text"
        @click="(e) => deleteConfirmed(e)"
      />
    </div>
  </div>
</template>

<script>
import Button from "primevue/button";

export default {
  emits: ["delete-confirmed", "close-modal"],
  components: {
    Button,
  },
  props: {
    gameName: {
      type: String,
      default: "",
    },
  },
  methods: {
    deleteConfirmed(e) {
      e.stopPropagation();
      this.$emit("delete-confirmed");
    },
    closeModal(e) {
      e.stopPropagation();
      this.$emit("close-modal");
    },
  },
};
</script>

<style scoped>
.buttons {
  margin: 0 auto;
  width: fit-content;
}
</style>