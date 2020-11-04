<template>
  <ListView v-if="showAsList" />
  <TableView v-else />
  <Modal
    v-if="showModal"
    @cancel-delete="cancelDelete"
    @delete-confirmed="deleteItem"
  />
</template>
<script>
import ListView from "./ListView.vue";
import TableView from "./TableView.vue";
import Modal from "./Modal.vue";

export default {
  name: "ListHolder",
  components: {
    ListView,
    TableView,
    Modal,
  },
  data: () => {
    return {
      showModal: true,
    };
  },
  props: ["showAsList"],
  methods: {
    cancelDelete() {
      console.log("Canceling");
      this.showModal = !this.showModal;
    },
    deleteItem() {
      this.showModal = !this.showModal;
      console.log("Deleting");
    },
  },
};
</script>