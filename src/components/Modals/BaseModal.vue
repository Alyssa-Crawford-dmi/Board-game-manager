<template >
  <div>
    <div class="Backdrop" @click="(e) => closeModal(e)"></div>
    <div class="Modal">
      <Button
        @click="closeModal"
        icon="pi pi-times"
        class="p-button-rounded p-button-plain p-button-outlined"
        title="Delete Item"
      />
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Button from "primevue/button";

export default {
  name: "Modal",
  components: {
    Button,
  },
  emits: ["close-modal"],
  methods: {
    closeModal() {
      this.$emit("close-modal");
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
</style>