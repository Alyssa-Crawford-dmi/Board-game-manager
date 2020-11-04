<template>
  <p>List holder</p>
  <ListView v-if="showAsList" />
  <TableView v-else />
</template>
<script>
import ListView from "./ListView.vue";
import TableView from "./TableView.vue";

export default {
  name: "ListHolder",
  components: {
    ListView,
    TableView,
  },
  props: ["showAsList"],
};
</script>