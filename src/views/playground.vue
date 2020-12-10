<template>
  <TabMenu :model="items" />
</template>

<script>
// import { activeUserState } from "../utils/activeUser";
import TabMenu from "primevue/tabmenu";

export default {
  components: { TabMenu },
  data() {
    return {
      items: [
        { label: "Home", icon: "pi pi-fw pi-home", to: "/play" },
        {
          label: "Calendar",
          icon: "pi pi-fw pi-calendar",
          to: "/play/calendar",
        },
        { label: "Edit", icon: "pi pi-fw pi-pencil", to: "/play/edit" },
        {
          label: "Documentation",
          icon: "pi pi-fw pi-file",
          to: "/play/documentation",
        },
        { label: "Settings", icon: "pi pi-fw pi-cog", to: "/play/settings" },
      ],
    };
  },
};
</script>
<style scoped>
</style>