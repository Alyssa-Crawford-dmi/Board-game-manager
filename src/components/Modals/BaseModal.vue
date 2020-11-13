<template >
  <div>
    <div class="Backdrop" @click="(e) => closeModal(e)"></div>
    <div class="Modal">
      <div class="header">
        <div class="p-grid">
          <div class="title p-col">
            <h4>
              <slot name="title">Title</slot>
            </h4>
          </div>
          <div class="close-button p-col-fixed">
            <Button
              @click="closeModal"
              icon="pi pi-times"
              class="p-button-rounded p-button-plain p-button-outlined p-button-sm"
              title="Close"
            />
          </div>
        </div>
      </div>
      <div class="content">
        <slot></slot>
      </div>
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
  border: 1px solid #ccc;
  box-shadow: 1px 1px 1px black;
  padding: 2px 2px 16px 2px;
  left: 15%;
  top: 30%;
  box-sizing: border-box;
  transition: all 0.3s ease-out;
  text-align: center;
}
.header {
  background-color: var(--light-purple-gray);
  box-sizing: border-box;
  width: 100%;
  padding: 2px 2px 0 0;
  border-bottom: 1px solid lightgray;
}
.title {
  font-size: 1.7rem;
  text-align: center;
}
h4 {
  padding: 7px 0 0 55px;
  font-weight: 500;
  margin: 0;
}
.close-button {
  margin-top: 0;
  text-align: right;
  width: 55px;
}
.content {
  padding: 0 16px;
}

@media (min-width: 600px) {
  .Modal {
    width: 500px;
    left: calc(50% - 250px);
  }
}
</style>