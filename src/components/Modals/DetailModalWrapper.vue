<template>
  <div class="bounded-width">
    <Suspense>
      <template #default>
        <DetailModal :gameId="gameId" />
      </template>
      <template #fallback>
        <ProgressSpinner />
      </template>
    </Suspense>
    <div class="slot-style">
      <slot name="action-btn"></slot>
    </div>
  </div>
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
.slot-style {
  margin: 0.5rem auto;
}
</style>