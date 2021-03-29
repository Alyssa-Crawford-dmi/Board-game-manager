import { ref } from "@vue/reactivity";
import axios from "axios";
import { loginState } from "./auth";

export const friendsListState = {
  friends: ref([]),
  sentRequests: ref([]),
  pendingRequests: ref([]),
  async getFriends() {
    const user = loginState.loggedInUser.value;
    const res = (await axios.get(`/api/friends/${user}`)).data;
    const allFriends = res.map((elm) => {
      return {
        isInviter: elm.inviter === user,
        friendName: elm.PartitionKey === user ? elm.RowKey : elm.PartitionKey,
        pending: elm.pending,
      };
    });
    this.friends.value = allFriends.filter(
      (friend) => friend.pending === false
    );
    this.sentRequests.value = allFriends.filter(
      (friend) => friend.pending === true && friend.isInviter
    );
    this.pendingRequests.value = allFriends.filter(
      (friend) => friend.pending === true && !friend.isInviter
    );
  },
  async acceptFriend(friend) {
    const user = loginState.loggedInUser.value;

    const url = friend.isInviter
      ? this.buildUrl(user, friend.friendName)
      : this.buildUrl(friend.friendName, user);

    await axios.put(url);
    await this.getFriends();
  },
  async addFriend(friendName) {
    const user = loginState.loggedInUser.value;
    const url = this.buildUrl(user, friendName);
    await axios.post(url);
    await this.getFriends();
  },
  buildUrl(inviter, invitee) {
    return inviter < invitee
      ? `/api/friends/${inviter}/${invitee}/${inviter}`
      : `/api/friends/${invitee}/${inviter}/${inviter}`;
  },
};
