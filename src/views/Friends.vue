<template>
  <h2>Add Friend</h2>
  <AddFriend></AddFriend>
  <h2>Invitations</h2>
  <PendingList></PendingList>
  <h2>My Pending Friend Requests</h2>
  <PendingList></PendingList>
  <h2>My Friends</h2>
  <MyFriends></MyFriends>
</template>

<script>
import AddFriend from "../components/Friends/AddFriend";
import PendingList from "../components/Friends/PendingList";
import MyFriends from "../components/Friends/MyFriends";

export default {
  components: { AddFriend, PendingList, MyFriends },
};
</script>