<template>
  <div>
    <p v-if="!readMoreActivated">{{ text.slice(0, 200) }}</p>
    <p v-else>{{ text }}</p>
    <Button
      @click="toggleReadMore"
      class="p-button-text p-button-plain p-button-sm styled-button"
      >{{ readMoreActivated ? "Less" : "More" }}</Button
    >
  </div>
</template>
<script>
import Button from "primevue/button";

export default {
  name: "PreviewText",
  components: {
    Button,
  },
  props: { text: { required: true, type: String } },
  data() {
    return {
      readMoreActivated: false,
    };
  },
  methods: {
    toggleReadMore() {
      this.readMoreActivated = !this.readMoreActivated;
    },
  },
};
</script>
<style scoped>
p {
  padding-bottom: 0;
  margin: 0;
}
.styled-button {
  margin: 0;
  padding: 0;
}
</style>