<template>
  <div @click="itemClicked">
    <p>Table view</p>
  </div>
</template>
<script>
export default {
  name: "GridItem",
  methods: {
    itemClicked() {
      this.$emit("item-clicked", this.index);
    },
  },
  props: ["index"],
};
</script>
<style scoped>
div {
  background-color: darkseagreen;
}
</style>