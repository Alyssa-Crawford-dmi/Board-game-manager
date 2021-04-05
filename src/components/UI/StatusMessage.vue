<template>
  <!-- <div class="p-col-12 wrapper">
    <div
      :class="{
        error: messageInfo.error,
        success: !messageInfo.error,
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
  </div> -->
  <p :class="['text', messageClass]">{{ messageText }}</p>
</template>
<script>
const MessageTypes = {
  SUCCESS: "SUCCESS",
  INFO: "INFO",
  INFO_END: "INFO_END",
  ERROR: "ERROR",
  NO_MSG: "NO_MESSAGE",
};
export default {
  name: "message",
  props: {
    searchResultsLength: {
      type: Number,
      required: true,
    },
    showNoResultsError: {
      type: Boolean,
      required: true,
    },
    resultsPage: {
      type: Number,
      required: true,
    },
    gameAdded: {
      type: Number,
      required: true,
    },
  },
  mounted() {},
  watch: {
    gameAdded: function () {
      if (this.gameAdded !== 0) {
        this.showGameAdded = true;
        if (this.autoDismiss) {
          clearTimeout(this.autoDismiss);
        }
        this.autoDismiss = setTimeout(() => {
          this.dismissMessage();
        }, 2000);
      }
    },
  },
  beforeUnmount() {
    clearTimeout(this.autoDismiss);
  },
  data: () => {
    return { autoDismiss: null, showGameAdded: true };
  },
  methods: {
    dismissMessage() {
      this.showGameAdded = false;
    },
  },
  computed: {
    messageType() {
      if (this.gameAdded !== 0 && this.showGameAdded) {
        return MessageTypes.SUCCESS;
      }
      if (this.searchResultsLength !== 0) {
        return MessageTypes.INFO;
      }
      if (this.resultsPage > 0) {
        return MessageTypes.INFO_END;
      }
      if (this.showNoResultsError) {
        return MessageTypes.ERROR;
      }
      return MessageTypes.NO_MSG;
    },
    messageText() {
      switch (this.messageType) {
        case MessageTypes.SUCCESS:
          return "Game added successfully";
        case MessageTypes.INFO:
          return "Click on a game to see more information";
        case MessageTypes.INFO_END:
          return "End of results";
        case MessageTypes.ERROR:
          return "No games found. Please try a different search";
        default:
          return " ";
      }
    },
    messageClass() {
      switch (this.messageType) {
        case MessageTypes.SUCCESS:
          return "success";
        case MessageTypes.INFO:
        case MessageTypes.INFO_END:
          return "info";
        case MessageTypes.ERROR:
          return "error";
        default:
          return "";
      }
    },
  },
};
</script>
<style scoped>
.text {
  padding: 0;
  margin: 0;
  /* font-weight: 500; */
}
.success {
  color: green;
}
.info,
.info-end {
  color: var(--dark-gray);
}
.error {
  color: red;
}
</style>