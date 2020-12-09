<template>
  <Button type="button" label="Toggle" @click="toggle" />
</template>

<script>
import Button from "primevue/button";
import axios from "axios";
import { activeUserState } from "../utils/activeUser";
import { loginState } from "../utils/auth";

export default {
  components: {
    Button,
  },
  data() {
    return {};
  },
  mounted() {
    console.log(this.$route);
    if (this.$route.query.user) {
      console.log("inside if");
      activeUserState.setActiveUser(this.$route.query.user);
    } else if (loginState.loggedIn) {
      activeUserState.setActiveUser(loginState.loggedInUser.value);
    }
  },
  methods: {
    toggle() {
      axios
        .post("/api/games/acFake")
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    },
  },
};
</script>
<style scoped>
.div {
  background-color: blueviolet;
}
</style>