<template>
  <div class="card container">
    <i
      class="pi pi-times custom-btn pointer danger"
      title="Remove friend"
      @click="removeFriend"
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
  /* border: 1px solid aqua; */
  margin: 0.3rem 0.3rem 0 0;
  align-items: center;
  padding: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
