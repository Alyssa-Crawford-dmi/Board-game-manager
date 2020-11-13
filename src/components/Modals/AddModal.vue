<template>
  <div>
    <h3>Add games to the list</h3>
    <span class="p-input-icon-left">
      <i class="pi pi-search" />
      <InputText
        type="text"
        v-model="searchTerm"
        placeholder="Ticket to Ride"
        class="p-inputtext-lg"
      />
    </span>
  </div>
</template>
<script>
import InputText from "primevue/inputtext";

export default {
  name: "AddModal",
  components: {
    InputText,
  },
  data: () => {
    return { searchTerm: "" };
  },
};
</script>