<template>
  <div v-if="showAsList">
    <ListItem
      v-for="(game, index) in gamesList"
      :key="game"
      @item-clicked="(gameIndex) => openModal(gameIndex)"
      :index="index"
    />
  </div>
  <div v-else>
    <GridItem
      v-for="(game, index) in gamesList"
      :key="game"
      @item-clicked="(gameIndex) => openModal(gameIndex)"
      :index="index"
    />
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
      indexToRemove: -1,
    };
  },
  props: ["showAsList"],
  methods: {
    cancelDelete() {
      this.showModal = !this.showModal;
      console.log("Canceling delete");
    },
    deleteItem() {
      this.showModal = !this.showModal;
      this.gamesList.splice(this.indexToRemove, 1);
      console.log("deleted ", this.gamesList);
    },
    openModal(clickedIndex) {
      this.showModal = true;
      this.indexToRemove = clickedIndex;
    },
  },
};
</script>