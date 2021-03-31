<template>
  <GamesList
    :gamesList="gamesList"
    @delete-item="(gameIndex) => openConfirmModal(gameIndex)"
    @move-item="(gameIndex) => openMoveModal(gameIndex)"
    @add-games="openAddGamesModal"
    @game-detail="(game) => openDetailModal(game)"
    @unauthorized-action="openErrorModal"
  />
  <Dialog
    :header="header"
    v-model:visible="showModal"
    :modal="true"
    :style="{ width: modalWidth }"
  >
    <ConfirmModal
      v-if="selectedModalType === 'BASIC_CONFIRM'"
      @action-confirmed="moveOrRemoveItem"
      :gameName="gamesList[indexToRemove] ? gamesList[indexToRemove].name : ''"
      :actionName="action"
      :listName="confirmListName"
    /><AddModal
      v-else-if="selectedModalType === 'ADD'"
      @add-game="(game) => addGame(game)"
      :addStatus="addStatus"
      :gamesList="gamesList"
      @game-detail="(game, search) => openDetailModal(game, search)"
      :lastSearch="lastSearch"
    />
    <ErrorModal
      v-else-if="selectedModalType === 'ERROR'"
      @close-modal="showModal = false"
    />
    <DetailModalWrapper v-else :gameId="detailGame.id">
      <template v-slot:action-btn v-if="lastSearch">
        <div class="btn-container">
          <Button
            @click="(e) => addGame(detailGame, e, true)"
            :label="isWishList ? 'Add to owned list' : 'Add to wish list'"
            class="p-button-text p-button-rounded"
            :title="isWishList ? 'Add to owned list' : 'Add to wish list'"
          />
          <Button
            @click="(e) => addGame(detailGame, e)"
            label="Add game to list"
            class="p-button-rounded"
            title="Add game"
          />
        </div>
      </template>
    </DetailModalWrapper>
  </Dialog>
</template>
<script>
import GamesList from "../components/GamesList";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import ConfirmModal from "../components/Modals/ConfirmModal.vue";
import AddModal from "../components/Modals/AddModal.vue";
import DetailModalWrapper from "../components/Modals/DetailModalWrapper.vue";
import ErrorModal from "../components/Modals/ErrorModal.vue";

import { modalTypes } from "../utils/modalTypes.js";
import { basicActions } from "../utils/modalTypes.js";
import { gamesListState } from "../utils/gameListManager.js";
import { loginState } from "../utils/auth";
import { activeUserState } from "../utils/activeUser";

export default {
  components: {
    GamesList,
    ConfirmModal,
    AddModal,
    DetailModalWrapper,
    ErrorModal,
    Dialog,
    Button,
  },
  data: () => {
    return {
      showModal: false,
      selectedModalType: modalTypes.BASIC_CONFIRM,
      gamesList: gamesListState.gameList,
      indexToRemove: -1,
      addStatus: {},
      detailGame: {},
      lastSearch: "",
      isWishList: activeUserState.isWishList,
      action: "",
    };
  },
  computed: {
    header() {
      switch (this.selectedModalType) {
        case modalTypes.BASIC_CONFIRM:
          return this.action === basicActions.REMOVE
            ? "Remove game"
            : "Move game";
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
      if (this.selectedModalType === modalTypes.BASIC_CONFIRM && bigScreen) {
        return "50vw";
      }
      if (this.selectedModalType === modalTypes.BASIC_CONFIRM || bigScreen) {
        return "75vw";
      }
      return "90vw";
    },
    confirmListName() {
      if (this.action === basicActions.MOVE) {
        return this.isWishList ? "owned list" : "wishlist";
      }
      return this.isWishList ? "wishlist" : "owned list";
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
      if (!activeUserState.activeUser.value) {
        activeUserState.setActiveUserAndListMode(loginState.loggedInUser.value);
      }
    },
    moveOrRemoveItem() {
      this.showModal = false;
      if (this.indexToRemove === -1) {
        return;
      }
      this.action === basicActions.REMOVE
        ? gamesListState.removeGameAtIndex(this.indexToRemove)
        : gamesListState.moveGameToOtherList(this.indexToRemove);
      this.indexToRemove = -1;
    },
    openConfirmModal(clickedIndex) {
      this.showModal = true;
      this.indexToRemove = clickedIndex;
      this.action = basicActions.REMOVE;
      this.selectedModalType = modalTypes.BASIC_CONFIRM;
    },
    openMoveModal(clickedIndex) {
      this.showModal = true;
      this.indexToRemove = clickedIndex;
      this.action = basicActions.MOVE;
      this.selectedModalType = modalTypes.BASIC_CONFIRM;
    },
    openAddGamesModal() {
      this.showModal = true;
      this.selectedModalType = modalTypes.ADD;
    },
    openDetailModal(game, search) {
      this.detailGame = game;
      this.showModal = true;
      this.selectedModalType = modalTypes.DETAIL;
      this.lastSearch = search;
    },
    openErrorModal() {
      this.showModal = true;
      this.selectedModalType = modalTypes.ERROR;
    },
    addGame(newGame, e, addToOtherList = false) {
      this.addStatus = gamesListState.addGameIfNotExists(
        newGame,
        addToOtherList
      );
      if (e) {
        this.showModal = false;
      }
    },
  },
};
</script>
<style scoped>
.btn-container {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
}
</style>