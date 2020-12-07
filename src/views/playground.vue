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
      axios.get(`/api/tempFunc`);
    },
  },
};
</script>