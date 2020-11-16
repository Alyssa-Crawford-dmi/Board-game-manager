<template>
  <GamesList
    :gamesList="gamesList"
    @delete-item="(gameIndex) => openDeleteModal(gameIndex)"
    @add-games="openAddGamesModal"
  />
  <Dialog
    :header="deleteModal ? 'Remove game' : 'Add games'"
    v-model:visible="showModal"
    :style="{ width: deleteModal ? '50vw' : '75vw' }"
    :modal="true"
  >
    <DeleteModal
      v-if="deleteModal"
      @delete-confirmed="deleteItem"
      :gameName="gamesList[indexToRemove] ? gamesList[indexToRemove].name : ''"
    /><AddModal
      v-else
      @add-game="(game) => addGame(game)"
      :addStatus="addStatus"
    />
  </Dialog>
</template>
<script>
import { getGamesFromIds } from "../apiInteractions/boardGameAtlas";
import GamesList from "../components/GamesList";
import Dialog from "primevue/dialog";
import DeleteModal from "../components/Modals/DeleteModal.vue";
import AddModal from "../components/Modals/AddModal.vue";

export default {
  components: {
    GamesList,
    DeleteModal,
    AddModal,
    Dialog,
  },
  data: () => {
    return {
      showModal: false,
      deleteModal: true,
      gamesList: [],
      indexToRemove: -1,
      addStatus: {},
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
      this.addStatus = {};
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
    addGame(newGame) {
      const duplicate = this.gamesList.some((game) => game.id === newGame.id);
      if (duplicate) {
        this.addStatus = { error: true, msg: "Game already in list" };
      } else {
        this.addStatus = { error: false, msg: "Game added successfuly" };
        this.gamesList.push(newGame);
      }
    },
  },
};
</script>