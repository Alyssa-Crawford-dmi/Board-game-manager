<template>
  <div class="flex-test">
    <h1>longer Text</h1>
    <Button label="First" />
    <Button label="Second" />
  </div>
</template>

<script>
import Button from "primevue/button";

export default {
  components: { Button },
};
</script>
<style scoped>
.flex-test {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>