<template>
  <TabMenu :model="navItems" />
</template>
<script>
import TabMenu from "primevue/tabmenu";

import { activeUserState } from "../utils/activeUser";

export default {
  components: {
    TabMenu,
  },
  methods: {
    tabActive(isWishList) {
      return isWishList === activeUserState.isWishList.value
        ? "p-highlight"
        : "";
    },
  },
  computed: {
    navItems() {
      return [
        {
          label: "Owned",
          command: () => {
            activeUserState.setActiveUserAndListMode(
              activeUserState.activeUser.value,
              false
            );
          },
          class: this.tabActive(false),
        },
        {
          label: "Wishlist",
          command: () => {
            activeUserState.setActiveUserAndListMode(
              activeUserState.activeUser.value,
              true
            );
          },
          class: this.tabActive(true),
        },
      ];
    },
  },
};
</script>