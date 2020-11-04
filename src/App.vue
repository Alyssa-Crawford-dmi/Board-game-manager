<template>
  <GameList :games="games" />
</template>

<script>
import GameList from "./components/GameList.vue";
import { getGameByName } from "./apiInteractions/boardGameAtlas";

export default {
  name: "App",
  components: {
    GameList,
  },
  data() {
    return {
      games: ["ticket to ride", "dominon", "another"],
    };
  },
  mounted() {
    getGameByName("Catan").then((data) => {
      data;
      //do stuff with data
    });
  },
};
</script>

<style>
</style>
