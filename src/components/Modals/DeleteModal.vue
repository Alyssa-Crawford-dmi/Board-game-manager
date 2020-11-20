<template>
  <div>
    <p>Are you sure you like like to remove "{{ gameName }}" from the list?</p>
    <div class="button">
      <Button
        label="Remove"
        class="p-button-raised p-button-danger p-button-text"
        @click="(e) => deleteConfirmed(e)"
      />
    </div>
    <Message :messageInfo="{ msg: 'Hello', eror: true }" />
  </div>
</template>

<script>
import Button from "primevue/button";
import Message from "../UI/Message";

export default {
  emits: ["delete-confirmed"],
  components: {
    Button,
    Message,
  },
  props: {
    gameName: {
      type: String,
      default: "",
    },
  },
  methods: {
    deleteConfirmed() {
      this.$emit("delete-confirmed");
    },
  },
};
</script>

<style scoped>
.button {
  margin: 0 auto;
  width: fit-content;
}
</style>