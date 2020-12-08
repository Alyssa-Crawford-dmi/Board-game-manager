<template>
  <Button type="button" label="Toggle" @click="toggle" />
</template>

<script>
import Button from "primevue/button";

export default {
  components: {
    Button,
  },
  data() {
    return {};
  },
  methods: {
    toggle() {
      console.log("hello");
    },
  },
};
</script>