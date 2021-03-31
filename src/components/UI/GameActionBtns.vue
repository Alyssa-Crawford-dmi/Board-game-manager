<template>
  <div :class="['container', showMoveText ? 'stack-info' : '']">
    <Button
      @click="(e) => deleteItem(e)"
      label="Remove game"
      class="p-button-danger p-button-text p-button-rounded"
      title="Delete Item"
      :disabled="disabled"
    />
    <div v-if="!showMoveText" :class="['spacer', isWishList ? 'first' : '']" />
    <Button
      @click="(e) => moveItem(e)"
      :icon="
        isWishList ? 'pi pi-angle-double-right' : 'pi pi-angle-double-left'
      "
      :class="[
        'p-button-rounded',
        'p-button-text',
        'p-button-secondary',
        !isWishList && !showMoveText ? 'first' : '',
      ]"
      :title="moveBtnText"
      :label="showMoveText ? moveBtnText : ''"
      :iconPos="isWishList ? 'right' : 'left'"
      :disabled="disabled"
    />
  </div>
</template>

<script>
import Button from "primevue/button";
import { activeUserState } from "../../utils/activeUser";

export default {
  components: {
    Button,
  },
  props: {
    showMoveText: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
  },
  emits: ["delete-item", "move-item"],
  methods: {
    deleteItem(e) {
      e.stopPropagation();
      this.$emit("delete-item");
    },
    moveItem(e) {
      e.stopPropagation();
      this.$emit("move-item");
    },
  },
  data: () => {
    return {
      isWishList: activeUserState.isWishList,
    };
  },
  computed: {
    moveBtnText() {
      return this.isWishList ? "Move to owned list" : "Move to wish list";
    },
  },
};
</script>
<style scoped>
.container {
  display: flex;
  justify-content: space-between;
}
.stack-info {
  flex-direction: column;
}
.first {
  order: -1;
}
.spacer {
  width: 2rem;
}
</style>
