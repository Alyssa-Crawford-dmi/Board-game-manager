<template>
  <div>
    <h1>This is a header</h1>
    <IonButton
      @click="() => toggleClicked()"
      color="medium"
      fill="solid"
      size="small"
      icon-only
    >
      <span class="material-icons" v-if="showAsList" title="Grid view">
        grid_on
      </span>
      <span class="material-icons" v-else title="List view"> list </span>
    </IonButton>
  </div>
</template>

<script>
import { IonButton } from "@ionic/vue";
export default {
  props: ["showAsList"],
  components: { IonButton },
  methods: {
    toggleClicked() {
      this.$emit("toggle-clicked");
    },
  },
};
</script>