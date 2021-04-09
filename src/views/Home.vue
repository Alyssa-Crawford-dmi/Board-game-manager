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
    :style="{
      width: modalWidth,
      minHeight: modalHeight,
      marginTop: modalMargin,
    }"
    :contentStyle="{ padding: 0, margin: 0 }"
    :closable="false"
  >
    <template #header>
      <div class="dialog-header">
        <h3 class="dialog-title">{{ header }}</h3>
        <div class="p-dialog-header-icons">
          <button
            class="p-dialog-header-icon p-dialog-header-close p-link"
            @click="closeModal"
            type="button"
            tabindex="-1"
          >
            <span
              :class="[
                'p-dialog-header-close-icon',
                'pi',
                selectedModalType === 'DETAIL' && lastSearch
                  ? 'pi-arrow-left'
                  : 'pi-times',
              ]"
            ></span>
          </button>
        </div>
      </div>
    </template>
    <ConfirmModal
      v-if="selectedModalType === 'BASIC_CONFIRM'"
      @action-confirmed="moveOrRemoveItem"
      :gameName="gamesList[indexToRemove] ? gamesList[indexToRemove].name : ''"
      :actionName="action"
      :listName="confirmListName"
    /><AddModal
      v-else-if="selectedModalType === 'ADD'"
      @add-game="(game) => addGame(game)"
      @close-modal="closeModal"
      :addStatus="addStatus"
      :gamesList="gamesList"
      @game-detail="(game, search, page) => openDetailModal(game, search, page)"
      :lastSearch="lastSearch"
      :lastPage="lastPage"
    />
    <ErrorModal
      v-else-if="selectedModalType === 'ERROR'"
      @close-modal="closeModal"
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
import { systemInfo } from "../utils/systemInfo";

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
      showModal: systemInfo.isModalOpen,
      selectedModalType: modalTypes.BASIC_CONFIRM,
      gamesList: gamesListState.gameList,
      indexToRemove: -1,
      addStatus: {},
      detailGame: {},
      lastSearch: "",
      lastPage: 0,
      isWishList: activeUserState.isWishList,
      action: "",
      windowWidth: systemInfo.windowWidth,
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
    smallScreen() {
      return this.windowWidth < 600;
    },
    modalWidth() {
      const bigScreen = this.windowWidth > 900;
      if (this.selectedModalType === modalTypes.BASIC_CONFIRM && bigScreen) {
        return "50vw";
      }
      if (this.selectedModalType === modalTypes.BASIC_CONFIRM || bigScreen) {
        return "75vw";
      }
      if (this.smallScreen) {
        return "98vw";
      }
      return "90vw";
    },
    modalHeight() {
      if (
        this.smallScreen &&
        this.selectedModalType !== modalTypes.BASIC_CONFIRM
      ) {
        return "95vh";
      }
      return "auto";
    },
    modalMargin() {
      if (
        this.smallScreen &&
        this.selectedModalType !== modalTypes.BASIC_CONFIRM
      ) {
        return "10rem";
      }
      return "0";
    },
    confirmListName() {
      if (this.action === basicActions.MOVE) {
        return this.isWishList ? "your owned list" : "your wishlist";
      }
      return this.isWishList ? "your wishlist" : "your owned list";
    },
  },
  mounted() {
    this.setActiveUser();
  },
  watch: {
    showModal: function () {
      if (!this.showModal) {
        if (this.selectedModalType === modalTypes.DETAIL && this.lastSearch) {
          systemInfo.setIsModalOpen(true);
          this.selectedModalType = modalTypes.ADD;
          return;
        }
        if (this.selectedModalType === modalTypes.ADD) {
          this.lastSearch = "";
          this.lastPage = 0;
        }
      }
    },
  },
  methods: {
    closeModal() {
      systemInfo.setIsModalOpen(false);
    },
    setActiveUser() {
      if (!activeUserState.activeUser.value) {
        activeUserState.setActiveUserAndListMode(loginState.loggedInUser.value);
      }
    },
    moveOrRemoveItem() {
      systemInfo.setIsModalOpen(false);
      if (this.indexToRemove === -1) {
        return;
      }
      this.action === basicActions.REMOVE
        ? gamesListState.removeGameAtIndex(this.indexToRemove)
        : gamesListState.moveGameToOtherList(this.indexToRemove);
      this.indexToRemove = -1;
    },
    openConfirmModal(clickedIndex) {
      systemInfo.setIsModalOpen(true);
      this.indexToRemove = clickedIndex;
      this.action = basicActions.REMOVE;
      this.selectedModalType = modalTypes.BASIC_CONFIRM;
    },
    openMoveModal(clickedIndex) {
      systemInfo.setIsModalOpen(true);
      this.indexToRemove = clickedIndex;
      this.action = basicActions.MOVE;
      this.selectedModalType = modalTypes.BASIC_CONFIRM;
    },
    openAddGamesModal() {
      systemInfo.setIsModalOpen(true);
      this.selectedModalType = modalTypes.ADD;
    },
    openDetailModal(game, search, page) {
      this.detailGame = game;
      systemInfo.setIsModalOpen(true);
      this.selectedModalType = modalTypes.DETAIL;
      this.lastSearch = search;
      this.lastPage = page;
    },
    openErrorModal() {
      systemInfo.setIsModalOpen(true);
      this.selectedModalType = modalTypes.ERROR;
    },
    addGame(newGame, e, addToOtherList = false) {
      this.addStatus = gamesListState.addGameIfNotExists(
        newGame,
        addToOtherList
      );
      if (e) {
        systemInfo.setIsModalOpen(false);
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
.dialog-header {
  display: flex;
  width: 100%;
  margin: 0;
  padding: 0;
  justify-content: space-between;
}
.dialog-title {
  margin: 0;
  padding: 0;
}
</style>