import { mount } from "@vue/test-utils";
import AddModal from "@/components/Modals/AddModal.vue";
import axios from "axios";
import InputText from "primevue/inputtext";

describe("AdedModal.vue", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(AddModal);
  });

  //Basic components
  it("Has an inputText bound to searchTerm", async () => {
    const input = wrapper.findComponent(InputText);
    const search = "Ticket";
    await input.setValue(search);
    expect(input.exists()).toBe(true);
    expect(wrapper.vm.searchTerm === search).toBe(true);
  });
});
