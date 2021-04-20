<template>
  <TabMenu :model="navItems" :style="{ fontSize: 'larger' }" />
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
          label: "Wishlist",
          command: () => {
            activeUserState.setActiveUserAndListMode(
              activeUserState.activeUser.value,
              true
            );
          },
          class: this.tabActive(true),
        },
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
      ];
    },
  },
};
</script>