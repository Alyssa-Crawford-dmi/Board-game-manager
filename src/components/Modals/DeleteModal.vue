<template>
  <div>
    <h4>Are you sure you like like to remove this item from the list?</h4>
    <div class="buttons">
      <button class="Button Neutral" @click="(e) => closeModal(e)">
        Cancel
      </button>
      <button class="Button Danger remove" @click="(e) => deleteConfirmed(e)">
        Remove
      </button>
    </div>
  </div>
</template>

<script>
export default {
  emits: ["delete-confirmed", "close-modal"],
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