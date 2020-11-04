<template>
  <Header />
  <List-holder />
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
};
</script>

<style>
</style>
