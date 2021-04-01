<template>
  <div>
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
        class="space-left p-button-raised p-button-text p-button-lg p-button-rounded word-btn"
        title="Add Friend"
      />
    </div>
    <template v-if="sentRequests.length > 0">
      <h2>Sent Friend requests</h2>
      <DeleteCard
        v-for="friend in sentRequests"
        :key="friend"
        class="friend-item sent-requests"
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
        class="friend-item pending-friends"
        @remove-friend="() => removeFriend(friend)"
      >
        <p class="friend-text">
          {{ friend.friendName }}
        </p>
        <div class="action-buttons">
          <Button
            @click="(e) => acceptRequest(friend, e)"
            label="Accept"
            class="p-button-raised p-button-text p-button-lg p-button-rounded word-btn"
            title="Accept"
          />
        </div>
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
        <div class="action-buttons">
          <Button
            @click="() => seeList(friend, true)"
            label="Wishlist"
            class="space-left p-button-raised p-button-text p-button-lg p-button-rounded word-btn"
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
    friendsListState.getFriends();
  },
  data: () => {
    return {
      showModal: false,
      friendToAdd: "",
      friends: friendsListState.friends,
      sentRequests: friendsListState.sentRequests,
      pendingRequests: friendsListState.pendingRequests,
      invalidFriend: friendsListState.invalidFriend,
      requestSent: friendsListState.requestSent,
      friendToDelete: "",
      isSmallScreen: screen.width < 400,
    };
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
      this.showModal = true;
      this.friendToDelete = friend.friendName;
    },
    deleteItem() {
      this.showModal = false;
      friendsListState.removeFriend(this.friendToDelete);
    },
  },
};
</script>
<style scoped>
div {
  padding-left: 2rem;
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
  /* border: 1px solid aqua; */
  /* margin: 0.5rem; */
  padding: 0.3rem 0.5rem;
}
@media screen and (max-width: 400px) {
  .pending-friends {
    flex-direction: column;
    justify-content: left;
    align-items: flex-start;
  }
  .action-buttons {
    padding: 0rem;
  }
  .friend-text {
    margin-bottom: 0.5rem;
    margin-top: 0.5rem;
    border: 1px solid aqua;
  }
  .word-btn {
    /* border: 1px solid aqua; */
    /* margin: 0.5rem; */
    padding: 0.3rem 0.5rem;
    font-size: large;
  }
  /* .action-buttons {
    padding: 0rem;
  }
  .add-div {
    flex-direction: column;
    align-items: center;
  }
  .status-div {
    padding-bottom: 1rem;
  } */
}
</style>