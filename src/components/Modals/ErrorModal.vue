<template>
  <div class="centered">
    <p>You can only add or remove your own games</p>
    <Button
      @click="confirm"
      label="Okay"
      title="close popup"
      class="p-button-rounded"
    />
  </div>
</template>
<script>
import Button from "primevue/button";
export default {
  name: "ErroModal",
  emits: ["close-modal"],
  components: {
    Button,
  },
  methods: {
    confirm() {
      this.$emit("close-modal");
    },
  },
};
</script>
<style scoped>
p {
  font-size: 1.2rem;
  padding: 0.5rem 0 1rem;
}
.centered {
  text-align: center;
}
</style>