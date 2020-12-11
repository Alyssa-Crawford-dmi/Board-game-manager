<template>
  <PlayComp
    ><template v-slot:action-btn>
      <Button
        @click="(e) => addGame(game, e)"
        icon="pi pi-plus"
        class="p-button-rounded"
        title="Add game"
      /> </template
  ></PlayComp>
</template>

<script>
import PlayComp from "../components/PlayComp";
import Button from "primevue/button";

export default {
  components: { PlayComp, Button },
};
</script>
<style scoped>
</style>