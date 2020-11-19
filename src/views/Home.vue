<template>
  <GamesList
    :gamesList="gamesList"
    @delete-item="(gameIndex) => openDeleteModal(gameIndex)"
    @add-games="openAddGamesModal"
    @game-detail="(gameId) => openDetailModal(gameId)"
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
      v-else-if="selectedModalType === 'ADD'"
      @add-game="(game) => addGame(game)"
      :addStatus="addStatus"
      :gamesList="gamesList"
      @game-detail="(gameId, search) => openDetailModal(gameId, search)"
      :lastSearch="lastSearch"
    />
    <DetailModal v-else :gameId="detailGameId" />
  </Dialog>
</template>
<script>
import { getGamesFromIds } from "../apiInteractions/boardGameAtlas";
import GamesList from "../components/GamesList";
import Dialog from "primevue/dialog";
import DeleteModal from "../components/Modals/DeleteModal.vue";
import AddModal from "../components/Modals/AddModal.vue";
import DetailModal from "../components/Modals/DetailModalWrapper.vue";
import { modalTypes } from "../utils/modalTypes.js";

export default {
  components: {
    GamesList,
    DeleteModal,
    AddModal,
    DetailModal,
    Dialog,
  },
  data: () => {
    return {
      showModal: false,
      selectedModalType: modalTypes.DELETE,
      gamesList: [],
      indexToRemove: -1,
      addStatus: {},
      detailGameId: "",
      lastSearch: "",
      gameIds: [],
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
      const bigScreen = screen.width > 600;
      if (this.selectedModalType === modalTypes.DELETE && bigScreen) {
        return "50vw";
      }
      if (this.selectedModalType === modalTypes.DELETE || bigScreen) {
        return "75vw";
      }
      return "90vw";
    },
  },
  mounted() {
    const idStr = localStorage.getItem("idList");
    if (idStr && JSON.parse(idStr).length > 0) {
      this.gameIds = JSON.parse(idStr);
      getGamesFromIds(this.gameIds).then((res) => {
        this.gamesList = res;
      });
    }
  },
  watch: {
    showModal: function () {
      if (!this.showModal) {
        if (this.selectedModalType === modalTypes.DETAIL && this.lastSearch) {
          this.showModal = true;
          this.selectedModalType = modalTypes.ADD;
          return;
        }
        if (this.selectedModalType === modalTypes.ADD) {
          this.lastSearch = "";
        }
      }
    },
  },
  methods: {
    deleteItem() {
      this.showModal = false;
      if (this.indexToRemove === -1) {
        return;
      }
      this.gamesList.splice(this.indexToRemove, 1);
      this.gameIds.splice(this.indexToRemove, 1);
      localStorage.setItem("idList", JSON.stringify(this.gameIds));
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
    openDetailModal(gameId, search) {
      this.detailGameId = gameId;
      this.showModal = true;
      this.selectedModalType = modalTypes.DETAIL;
      this.lastSearch = search;
    },
    addGame(newGame) {
      const duplicate = this.gamesList.some((game) => game.id === newGame.id);
      if (duplicate) {
        this.addStatus = { error: true, msg: "Game already in list" };
      } else {
        this.addStatus = { error: false, msg: "Game added successfuly" };
        this.gamesList.push(newGame);
        this.gameIds.push(newGame.id);
        localStorage.setItem("idList", JSON.stringify(this.gameIds));
      }
    },
  },
};
</script>