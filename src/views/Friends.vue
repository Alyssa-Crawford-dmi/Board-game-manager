<template>
  <div class="outer-container">
    <h2>Add Friend</h2>
    <div class="add-div">
      <div class="status-div">
        <InputText
          type="text"
          v-model="friendToAdd"
          placeholder="Enter a username"
          class="p-inputtext-lg"
        />
        <small
          v-if="invalidFriend || requestSent"
          :class="invalidFriend ? 'p-error' : 'success'"
          >{{
            invalidFriend ? "No user exists with that username" : "Request sent"
          }}</small
        >
      </div>
      <Button
        @click="addFriend"
        label="Add Friend"
        class="add-friend-btn p-button-raised p-button-text p-button-lg p-button-rounded word-btn"
        title="Add Friend"
      />
    </div>
    <template v-if="sentRequests.length > 0">
      <h2>Sent Friend requests</h2>
      <DeleteCard
        v-for="friend in sentRequests"
        :key="friend"
        class="friend-item"
        @remove-friend="() => removeFriend(friend)"
      >
        <p class="friend-text">
          {{ friend.friendName }}
        </p>
      </DeleteCard>
    </template>
    <template v-if="pendingRequests.length > 0">
      <h2>Pending Friend Requests</h2>
      <DeleteCard
        v-for="friend in pendingRequests"
        :key="friend"
        class="friend-item"
        @remove-friend="() => removeFriend(friend)"
      >
        <p class="friend-text">
          {{ friend.friendName }}
        </p>
        <Button
          @click="(e) => acceptRequest(friend, e)"
          label="Accept"
          class="p-button-raised p-button-text p-button-lg p-button-rounded word-btn"
          title="Accept"
        />
      </DeleteCard>
    </template>
    <template v-if="friends.length > 0">
      <h2>My Friends</h2>
      <DeleteCard
        v-for="friend in friends"
        :key="friend"
        class="friend-item"
        @remove-friend="() => removeFriend(friend)"
      >
        <p class="friend-text">
          {{ friend.friendName }}
        </p>
        <Button
          v-if="isSmallScreen"
          @click="() => seeList(friend, true)"
          label="Games"
          class="p-button-raised p-button-text p-button-lg p-button-rounded word-btn"
          title="Games"
        />
        <div v-else>
          <Button
            @click="() => seeList(friend, true)"
            label="Wishlist"
            class="p-button-raised p-button-text p-button-lg p-button-rounded word-btn"
            title="Wishlist"
          />
          <Button
            @click="() => seeList(friend, false)"
            label="Owned games"
            class="space-left p-button-raised p-button-text p-button-lg p-button-rounded word-btn"
            title="Owned games"
          />
        </div>
      </DeleteCard>
    </template>
  </div>
  <Dialog
    header="Remove friend"
    v-model:visible="showModal"
    :modal="true"
    :style="{ width: '75vw' }"
  >
    <DeleteModal
      @action-confirmed="deleteItem"
      :gameName="friendToDelete"
      actionName="remove"
      listName="friends"
    />
  </Dialog>
</template>

<script>
import InputText from "primevue/inputtext";
import Dialog from "primevue/dialog";
import { friendsListState } from "../utils/friendsService";
import { activeUserState } from "../utils/activeUser";
import DeleteModal from "../components/Modals/ConfirmModal.vue";
import DeleteCard from "../components/UI/DeleteCard";
import Button from "primevue/button";
import { loginState } from "../utils/auth";
import { systemInfo } from "../utils/systemInfo";

export default {
  components: { Button, InputText, Dialog, DeleteModal, DeleteCard },
  beforeRouteEnter(_to, _from, next) {
    if (!loginState.loggedInUser.value) {
      next("/");
      return;
    }
    next();
  },
  mounted() {
    friendsListState.resetStatusFlags();
    friendsListState.getFriends();
  },
  data: () => {
    return {
      showModal: systemInfo.isModalOpen,
      friendToAdd: "",
      friends: friendsListState.friends,
      sentRequests: friendsListState.sentRequests,
      pendingRequests: friendsListState.pendingRequests,
      invalidFriend: friendsListState.invalidFriend,
      requestSent: friendsListState.requestSent,
      friendToDelete: "",
      windowWidth: systemInfo.windowWidth,
    };
  },
  computed: {
    isSmallScreen() {
      return this.windowWidth < 450;
    },
  },
  methods: {
    acceptRequest(friend) {
      friendsListState.acceptFriend(friend);
    },
    addFriend() {
      friendsListState.addFriend(this.friendToAdd);
      this.friendToAdd = "";
    },
    seeList(friend, isWishlist) {
      activeUserState.setActiveUserAndListMode(friend.friendName, isWishlist);
      this.$router.push("/");
    },
    removeFriend(friend) {
      this.systemInfo.setIsModalOpen(true);
      this.friendToDelete = friend.friendName;
    },
    deleteItem() {
      this.systemInfo.setIsModalOpen(false);
      friendsListState.removeFriend(this.friendToDelete);
    },
  },
};
</script>
<style scoped>
.outer-container {
  padding-left: 2rem;
  padding-right: 2rem;
}
h2 {
  color: var(--dark-gray);
}
.friend-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  align-items: center;
}
.space-left {
  margin-left: 1rem;
}
.add-friend-btn {
  margin-left: 1rem;
}
.status-div {
  display: inline-flex;
  flex-direction: column;
  padding-left: 0rem;
}
.add-div {
  padding-left: 0rem;
  display: flex;
  align-items: flex-start;
}
.success {
  color: green;
}
.friend-text {
  font-weight: bold;
  font-size: large;
}
.word-btn {
  padding: 0.3rem 0.5rem;
}
@media screen and (max-width: 500px) {
  .add-div {
    flex-direction: column;
    justify-content: flex-start;
  }
  .add-friend-btn {
    margin-left: 0;
    margin-top: 0.3rem;
  }
  .outer-container {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
}
</style>