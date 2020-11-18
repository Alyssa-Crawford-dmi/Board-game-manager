<template>
  <GamesList
    :gamesList="gamesList"
    @delete-item="(gameIndex) => openDeleteModal(gameIndex)"
    @add-games="openAddGamesModal"
  />
  <Dialog
    :header="header"
    v-model:visible="showModal"
    :modal="true"
    :style="{ width: modalWidth }"
  >
    <DeleteModal
      v-if="selectedModalType === 'DELETE'"
      @delete-confirmed="deleteItem"
      :gameName="gamesList[indexToRemove] ? gamesList[indexToRemove].name : ''"
    /><AddModal
      v-else
      @add-game="(game) => addGame(game)"
      :addStatus="addStatus"
      :gamesList="gamesList"
    />
  </Dialog>
</template>
<script>
import { getGamesFromIds } from "../apiInteractions/boardGameAtlas";
import GamesList from "../components/GamesList";
import Dialog from "primevue/dialog";
import DeleteModal from "../components/Modals/DeleteModal.vue";
import AddModal from "../components/Modals/AddModal.vue";
import { modalTypes } from "../utils/modalTypes.js";

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
      selectedModalType: modalTypes.DELETE,
      gamesList: [],
      indexToRemove: -1,
      addStatus: {},
    };
  },
  computed: {
    header() {
      switch (this.selectedModalType) {
        case modalTypes.DELETE:
          return "Remove game";
        case modalTypes.ADD:
          return "Add games";
        case modalTypes.DETAIL:
          return "Game detail";
        default:
          return "";
      }
    },
    modalWidth() {
      if (this.selectedModalType === modalTypes.DELETE) {
        return "50vw";
      }
      return "75vw";
    },
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
      this.selectedModalType = modalTypes.DELETE;
    },
    openAddGamesModal() {
      this.showModal = true;
      this.selectedModalType = modalTypes.ADD;
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