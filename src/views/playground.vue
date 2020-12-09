<template>
  <Button type="button" label="Toggle" @click="toggle" />
</template>

<script>
import Button from "primevue/button";
import axios from "axios";

export default {
  components: {
    Button,
  },
  data() {
    return {};
  },
  methods: {
    toggle() {
      axios.post("/api/games/acFake")
      .then(res=> console.log(res))
      .catch(err => console.log(err));
    },
  },
};
</script>