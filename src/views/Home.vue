<template>
  <GamesList
    :gamesList="gamesList"
    @delete-item="(gameIndex) => openDeleteModal(gameIndex)"
    @add-games="openAddGamesModal"
  />
  <Modal v-if="showModal" @close-modal="closeModal"
    ><DeleteModal
      v-if="deleteModal"
      @delete-confirmed="deleteItem"
      :gameName="gamesList[indexToRemove] ? gamesList[indexToRemove].name : ''"
    /><AddModal v-else @close-modal="closeModal" />
  </Modal>
</template>
<script>
import { getGamesFromIds } from "../apiInteractions/boardGameAtlas";
import GamesList from "../components/GamesList";
import Modal from "../components/Modals/BaseModal.vue";
import DeleteModal from "../components/Modals/DeleteModal.vue";
import AddModal from "../components/Modals/AddModal.vue";

export default {
  components: {
    GamesList,
    Modal,
    DeleteModal,
    AddModal,
  },
  data: () => {
    return {
      showModal: false,
      deleteModal: true,
      gamesList: [],
      indexToRemove: -1,
    };
  },
  mounted() {
    const gameIds = ["AuBvbISHR6", "GJ94Cl7cz5", "XZ9BeWAgCu", "GGwRDABj7L"];
    getGamesFromIds(gameIds).then((res) => {
      this.gamesList = res;
    });
  },
  methods: {
    closeModal() {
      this.showModal = !this.showModal;
    },
    deleteItem() {
      if (this.indexToRemove === -1) {
        this.showModal = !this.showModal;
        return;
      }
      this.showModal = !this.showModal;
      this.gamesList.splice(this.indexToRemove, 1);
      this.indexToRemove = -1;
    },
    openDeleteModal(clickedIndex) {
      this.showModal = true;
      this.indexToRemove = clickedIndex;
      this.deleteModal = true;
    },
    openAddGamesModal() {
      this.showModal = true;
      this.deleteModal = false;
    },
  },
};
</script>