<template>
  <div v-if="showAsList">
    <ListItem v-for="game in gamesList" :key="game" />
  </div>
  <div v-else>
    <GridItem v-for="game in gamesList" :key="game" />
  </div>
  <Modal
    v-if="showModal"
    @cancel-delete="cancelDelete"
    @delete-confirmed="deleteItem"
  />
</template>
<script>
import ListItem from "./ListItem.vue";
import GridItem from "./GridItem.vue";
import Modal from "./Modal.vue";

export default {
  name: "ListHolder",
  components: {
    ListItem,
    GridItem,
    Modal,
  },
  data: () => {
    return {
      showModal: false,
      gamesList: ["game1", "game2", "game3"],
    };
  },
  props: ["showAsList"],
  methods: {
    cancelDelete() {
      console.log("Canceling");
      this.showModal = !this.showModal;
    },
    deleteItem() {
      this.showModal = !this.showModal;
      console.log("Deleting");
    },
  },
};
</script>