<template>
  <div
    :class="{
      error: messageInfo.error,
      success: !messageInfo.error,
      'p-grid': true,
      'p-ai-center': true,
      'vertical-container': true,
      container: true,
    }"
  >
    <div class="p-col-2" style="text-align: center">
      <span :class="iconClass"></span>
    </div>
    <div class="p-col-8" style="text-align: center">
      {{ messageInfo.msg }}
    </div>
    <div class="p-col-2" style="text-align: right">
      <Button
        @click="() => dismissMessage()"
        icon="pi pi-times"
        class="p-button-rounded p-button-text p-button-plain"
        title="Close alert"
      />
    </div>
  </div>
</template>
<script>
import Button from "primevue/button";

export default {
  name: "message",
  props: ["messageInfo"],
  emits: ["dismiss-message"],
  components: {
    Button,
  },
  methods: {
    dismissMessage() {
      this.$emit("dismiss-message");
    },
  },
  computed: {
    iconClass() {
      return [
        "p-message-icon pi",
        {
          "pi-check": !this.messageInfo.error,
          "pi-times-circle": this.messageInfo.error,
        },
      ];
    },
  },
};
</script>
<style scoped>
.success {
  background-color: rgba(76, 175, 80, 50%);
  border: solid rgb(76, 175, 80) 2px;
}
.error {
  background-color: rgba(220, 53, 70, 50%);
  border: solid rgb(220, 53, 70) 2px;
}
.container {
  margin-top: 0.5rem;
  font-size: 1.2rem;
  width: 100%;
}
div {
  height: fit-content;
  padding: 0rem;
}
</style>