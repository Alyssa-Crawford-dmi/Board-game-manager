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
  <Modal v-if="showModal" @close-modal="closeModal"
    ><DeleteModal @close-modal="closeModal" @delete-confirmed="deleteItem"
  /></Modal>
</template>
<script>
import ListItem from "./ListItem.vue";
import GridItem from "./GridItem.vue";
import Modal from "./Modals/BaseModal.vue";
import DeleteModal from "./Modals/DeleteModal.vue";

export default {
  name: "ListHolder",
  components: {
    ListItem,
    GridItem,
    Modal,
    DeleteModal,
  },
  data: () => {
    return {
      showModal: false,
      gamesList: [],
      indexToRemove: -1,
    };
  },
  props: ["showAsList"],
  methods: {
    closeModal() {
      this.showModal = !this.showModal;
    },
    deleteItem() {
      this.showModal = !this.showModal;
      this.gamesList.splice(this.indexToRemove, 1);
    },
    openModal(clickedIndex) {
      this.showModal = true;
      this.indexToRemove = clickedIndex;
    },
  },
};
</script>