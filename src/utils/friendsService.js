import { ref } from "@vue/reactivity";
import axios from "axios";
import { loginState } from "./auth";

export const friendsListState = {
  friends: ref([]),
  sentRequests: ref([]),
  pendingRequests: ref([]),
  invalidFriend: ref(false),
  requestSent: ref(false),
  resetStatusFlags() {
    this.invalidFriend.value = false;
    this.requestSent.value = false;
  },
  async getFriends() {
    const user = loginState.loggedInUser.value;
    const res = (await axios.get(`/api/friends/${user}`)).data;
    const allFriends = res.map((elm) => {
      return {
        isInviter: elm.invitee !== user,
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

    axios.put(url).then(() => {
      this.resetStatusFlags();
      this.getFriends();
    });
  },
  async addFriend(friendName) {
    const user = loginState.loggedInUser.value;
    const url = this.buildUrl(user, friendName);
    axios.post(url).then(
      () => {
        this.requestSent.value = true;
        this.invalidFriend.value = false;

        this.getFriends();
      },
      () => {
        this.requestSent.value = false;
        this.invalidFriend.value = true;
      }
    );
  },
  async removeFriend(friendName) {
    const user = loginState.loggedInUser.value;
    const url = this.buildUrl(user, friendName);
    axios.delete(url).then(
      () => {
        this.resetStatusFlags();
        this.getFriends();
      },
      () => {}
    );
  },
  buildUrl(inviter, invitee) {
    return inviter < invitee
      ? `/api/friends/${inviter}/${invitee}/${invitee}`
      : `/api/friends/${invitee}/${inviter}/${invitee}`;
  },
};
