<template>
  <div class="p-dataview-layout-options p-buttonset">
    <button
      :class="buttonListClass"
      @click="changeLayout('list')"
      type="button"
      title="List view"
    >
      <i class="pi pi-bars"></i>
    </button>
    <button
      :class="buttonGridClass"
      @click="changeLayout('grid')"
      type="button"
      title="Grid view"
    >
      <i class="pi pi-th-large"></i>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: String,
  },
  computed: {
    buttonListClass() {
      return [
        "p-button p-button-icon-only",
        { inactive: this.modelValue !== "list" },
      ];
    },
    buttonGridClass() {
      return [
        "p-button p-button-icon-only",
        { inactive: this.modelValue !== "grid" },
      ];
    },
  },
  methods: {
    changeLayout(layout) {
      this.$emit("update:modelValue", layout);
    },
  },
};
</script>
<style scoped>
.inactive {
  background-color: var(--light-purple-gray);
}
.p-button {
  color: black;
}
</style>