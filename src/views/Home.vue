<template>
  <Header @toggle-clicked="showAsList = !showAsList" />
  <List-holder :showAsList="showAsList" />
</template>

<script>
import Header from "../components/Header.vue";
import ListHolder from "../components/ListHolder.vue";
export default {
  name: "Home",
  components: {
    Header,
    ListHolder,
  },
  data: () => {
    return {
      showAsList: false,
    };
  },
};
</script>

<style>
</style>
