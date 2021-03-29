<template>
  <div>
    <h2>Add Friend</h2>
    <InputText
      type="text"
      v-model="friendToAdd"
      placeholder="Enter a username"
      class="p-inputtext-lg"
    />
    <Button
      @click="addFriend"
      label="Add Friend"
      class="add-button p-button-raised p-button-text p-button-lg"
      title="Add Friend"
    />
    <template v-if="sentRequests.length > 0">
      <h2>Sent Friend requests</h2>
      <div
        v-for="friend in sentRequests"
        :key="friend"
        class="card friend-item"
      >
        <p>
          {{ friend.friendName }}
        </p>
      </div>
    </template>
    <template v-if="pendingRequests.length > 0">
      <h2>Pending Friend Requests</h2>
      <div
        v-for="friend in pendingRequests"
        :key="friend"
        class="card friend-item"
      >
        <p>
          {{ friend.friendName }}
        </p>
        <Button
          @click="(e) => acceptRequest(friend, e)"
          label="Accept"
          class="p-button-raised p-button-text p-button-lg"
          title="Accept"
        />
      </div>
    </template>
    <template v-if="friends.length > 0">
      <h2>My Friends</h2>
      <div v-for="friend in friends" :key="friend" class="card friend-item">
        <p>
          {{ friend.friendName }}
        </p>
      </div>
    </template>
  </div>
</template>

<script>
import InputText from "primevue/inputtext";

import { friendsListState } from "../utils/friendsService";
import Button from "primevue/button";

export default {
  components: { Button, InputText },
  mounted() {
    friendsListState.getFriends();
  },
  data: () => {
    return {
      friendToAdd: "",
      friends: friendsListState.friends,
      sentRequests: friendsListState.sentRequests,
      pendingRequests: friendsListState.pendingRequests,
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
  padding: 0.5rem 2rem;
}
.add-button {
  margin-left: 1rem;
}
</style>