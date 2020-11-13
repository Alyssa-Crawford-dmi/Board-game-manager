<template>
  <GamesList
    :gamesList="gamesList"
    @delete-item="(gameIndex) => openModal(gameIndex)"
  />
  <Modal v-if="showModal" @close-modal="closeModal"
    ><DeleteModal
      @close-modal="closeModal"
      @delete-confirmed="deleteItem"
      :gameName="gamesList[indexToRemove] ? gamesList[indexToRemove].name : ''"
  /></Modal>
</template>
<script>
import { getGamesFromIds } from "../apiInteractions/boardGameAtlas";
import GamesList from "../components/GamesList";
import Modal from "../components/Modals/BaseModal.vue";
import DeleteModal from "../components/Modals/DeleteModal.vue";

export default {
  components: {
    GamesList,
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
        return;
      }
      this.showModal = !this.showModal;
      this.gamesList.splice(this.indexToRemove, 1);
      this.indexToRemove = -1;
    },
    openModal(clickedIndex) {
      this.showModal = true;
      this.indexToRemove = clickedIndex;
    },
  },
};
</script>