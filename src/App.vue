<template>
  <Header />
  <List-holder :showAsList="showAsList" />
</template>

<script>
import Header from "./components/Header.vue";
import ListHolder from "./components/ListHolder.vue";

export default {
  name: "App",
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
