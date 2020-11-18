<template>
  <Suspense>
    <template #default>
      <DetailModal :gameId="gameId" />
    </template>
    <template #fallback>
      <ProgressSpinner />
    </template>
  </Suspense>
</template>
<script>
import DetailModal from "./DetailModal.vue";
import ProgressSpinner from "primevue/progressspinner";

export default {
  name: "DetailModalWrapper",
  props: { gameId: { type: String, required: true } },
  components: {
    DetailModal,
    ProgressSpinner,
  },
};
</script>
<style scoped>
.main-info {
  display: flex;
  align-items: center;
}
</style>