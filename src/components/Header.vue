<template>
  <div>
    <h1>This is a header</h1>
    <Button
      @click="() => toggleClicked()"
      :icon="iconVal"
      class="p-button-rounded p-button-secondary p-button-outlined"
      :title="showAsList ? 'Grid view' : 'Table view'"
    >
    </Button>
  </div>
</template>

<script>
import Button from "primevue/button";
export default {
  props: ["showAsList"],
  components: { Button },
  computed: {
    iconVal: function () {
      if (this.showAsList) {
        return "pi pi-table";
      }
      return "pi pi-list";
    },
  },
  methods: {
    toggleClicked() {
      this.$emit("toggle-clicked");
    },
  },
};
</script>
