<template>
  <Game v-for="game in games" :key="game" />
</template>

<script>
import Game from "./Game.vue";

export default {
  name: "GameList",
  components: {
    Game,
  },
  props: ["games"],
};
</script>