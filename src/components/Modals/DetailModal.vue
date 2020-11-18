<template>
  <p>Hello world {{ gameId }}</p>
</template>
<script>
export default {
  name: "DetailModal",
  props: { gameId: { type: String, required: true } },
};
</script>