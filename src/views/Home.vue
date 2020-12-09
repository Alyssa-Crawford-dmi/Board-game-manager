<template>
  <GamesList
    :gamesList="gamesList"
    @delete-item="(gameIndex) => openDeleteModal(gameIndex)"
    @add-games="openAddGamesModal"
    @game-detail="(gameId) => openDetailModal(gameId)"
    @unauthorized-action="openErrorModal"
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
    <ErrorModal
      v-else-if="selectedModalType === 'ERROR'"
      @close-modal="showModal = false"
    />
    <DetailModal v-else :gameId="detailGameId" />
  </Dialog>
</template>
<script>
import GamesList from "../components/GamesList";
import Dialog from "primevue/dialog";
import DeleteModal from "../components/Modals/DeleteModal.vue";
import AddModal from "../components/Modals/AddModal.vue";
import DetailModal from "../components/Modals/DetailModalWrapper.vue";
import ErrorModal from "../components/Modals/ErrorModal.vue";
import { modalTypes } from "../utils/modalTypes.js";
import { gamesListState } from "../utils/gameListManager.js";
import { loginState } from "../utils/auth";
import { activeUserState } from "../utils/activeUser";

export default {
  components: {
    GamesList,
    DeleteModal,
    AddModal,
    DetailModal,
    ErrorModal,
    Dialog,
  },
  data: () => {
    return {
      showModal: false,
      selectedModalType: modalTypes.DELETE,
      gamesList: gamesListState.gameList,
      indexToRemove: -1,
      addStatus: {},
      detailGameId: "",
      lastSearch: "",
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
        case modalTypes.ERROR:
          return "Error";
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
    this.setActiveUser();
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
    setActiveUser() {
      if (this.$route.query.user) {
        activeUserState.setActiveUserAndListMode(this.$route.query.user);
      } else if (loginState.loggedIn) {
        activeUserState.setActiveUserAndListMode(loginState.loggedInUser.value);
      }
    },
    deleteItem() {
      this.showModal = false;
      if (this.indexToRemove === -1) {
        return;
      }
      gamesListState.removeGameAtIndex(this.indexToRemove);
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
    openErrorModal() {
      this.showModal = true;
      this.selectedModalType = modalTypes.ERROR;
    },
    addGame(newGame) {
      this.addStatus = gamesListState.addGameIfNotExists(newGame);
    },
  },
};
</script>