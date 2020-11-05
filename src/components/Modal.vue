<template >
  <div class="Backdrop" @click="(e) => cancelDelete(e)">
    <div class="Modal">
      <h4>Are you sure you like like to remove this item from the list?</h4>
      <div class="buttons">
        <button class="Button Neutral" @click="(e) => cancelDelete(e)">
          Cancel
        </button>
        <button class="Button Danger remove" @click="(e) => deleteConfirmed(e)">
          Remove
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  methods: {
    cancelDelete(e) {
      e.stopPropagation();
      this.$emit("cancel-delete");
    },
    deleteConfirmed(e) {
      e.stopPropagation();
      this.$emit("delete-confirmed");
    },
  },
};
</script>

<style scoped>
.Backdrop {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
}
.Modal {
  position: fixed;
  z-index: 500;
  background-color: white;
  width: 70%;
  border: 1px solid #ccc;
  box-shadow: 1px 1px 1px black;
  padding: 16px;
  left: 15%;
  top: 30%;
  box-sizing: border-box;
  transition: all 0.3s ease-out;
  text-align: center;
}

@media (min-width: 600px) {
  .Modal {
    width: 500px;
    left: calc(50% - 250px);
  }
}
.buttons {
  margin: 0 auto;
  width: fit-content;
}
</style>