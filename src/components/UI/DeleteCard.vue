<template>
  <div class="container card">
    <i
      class="pi pi-times-circle custom-btn pointer danger"
      title="Remove friend"
      @click="removeFriend"
      style="font-size: 1.4rem"
    />
    <div class="slot">
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  emits: ["remove-friend"],
  methods: {
    removeFriend() {
      this.$emit("remove-friend");
    },
  },
};
</script>
<style scoped>
.container {
  position: relative;
  background-color: var(--very-light-gray);
  margin-bottom: 1rem;
}
.custom-btn {
  color: #e56c77;
  padding: 0;
  margin: 0;
  position: absolute;
  top: 4px;
  right: 4px;
}
.slot {
  margin: 0.3rem 0.3rem 0 0;
  align-items: center;
  padding: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
