<template>
  <Button
    type="button"
    label="Toggle"
    @click="toggle"
    aria-haspopup="true"
    aria-controls="overlay_menu"
  />
  <Menu id="overlay_menu" ref="menu" :model="items" :popup="true" />
</template>

<script>
import Menu from "primevue/menu";
import Button from "primevue/button";

export default {
  components: {
    Menu,
    Button,
  },
  data() {
    return {
      items: [
        {
          label: "My wishlist",
          command: () => {
            console.log("Wishlist");
          },
        },
        {
          label: "Owned games",
          command: () => {
            console.log("Owned");
          },
        },
        {
          label: "Shared with me",
          command: () => {
            console.log("shared");
          },
        },
        {
          label: "Sign out",
          command: () => {
            console.log("Signout");
          },
          icon: "pi pi-user",
        },
      ],
    };
  },
  methods: {
    toggle(event) {
      this.$refs.menu.toggle(event);
    },
    save() {
      this.$toast.add({
        severity: "success",
        summary: "Success",
        detail: "Data Saved",
        life: 3000,
      });
    },
  },
};
</script>