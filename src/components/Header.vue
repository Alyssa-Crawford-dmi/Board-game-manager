<template>
  <div>
    <h1>This is a header</h1>
    <button class="toggleView" @click="() => toggleClicked()">
      Toggle view
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    toggleClicked() {
      this.$emit("toggle-clicked");
    },
  },
};
</script>