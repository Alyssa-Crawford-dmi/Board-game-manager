<template>
  <div>
    <p>
      Are you sure you would like to {{ actionName }} "{{ gameName }}"
      {{ preposition }} the {{ listName }}?
    </p>
    <div class="button">
      <Button
        :label="capitalize(actionName)"
        :text="capitalize(actionName)"
        class="p-button-raised p-button-danger p-button-text p-button-rounded"
        @click="(e) => actionConfirmed(e)"
      />
    </div>
  </div>
</template>

<script>
import Button from "primevue/button";
import { basicActions } from "../../utils/modalTypes";

export default {
  emits: ["action-confirmed"],
  components: {
    Button,
  },
  props: {
    gameName: {
      type: String,
      default: "",
    },
    actionName: {
      type: String,
      required: true,
    },
    listName: {
      type: String,
      required: true,
    },
  },
  computed: {
    preposition() {
      return this.actionName === basicActions.MOVE ? "to" : "from";
    },
  },
  methods: {
    actionConfirmed() {
      this.$emit("action-confirmed");
    },
    capitalize(word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
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