<template>
  <div>
    <p>Table view {{ gameInfo.name }}</p>
  </div>
</template>
<script>
export default {
  name: "GridItem",
  props: ["gameInfo"],
};
</script>
<style scoped>
div {
  background-color: darkseagreen;
}
</style>