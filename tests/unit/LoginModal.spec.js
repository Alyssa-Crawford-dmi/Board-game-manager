import { mount } from "@vue/test-utils";
import LoginModal from "@/components/Modals/LoginModal.vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import { loginState } from "../../src/auth";

describe("LoginModal.vue", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(LoginModal);
  });

  //Components
  it("Has an inputText bound to username", async () => {
    const input = wrapper.findComponent(InputText);
    const name = "Alyssa";
    await input.setValue(name);
    expect(input.exists()).toBe(true);
    expect(wrapper.vm.username === name).toBe(true);
  });
  it("Has an inputText bound to password", async () => {
    const input = wrapper.findAllComponents(InputText)[1];
    const pass = "1234";
    await input.setValue(pass);
    expect(input.exists()).toBe(true);
    expect(wrapper.vm.password === pass).toBe(true);
  });
  it("Set invalid username to true if the username is empty and the button is pressed", async () => {
    wrapper.vm.username = "";
    await wrapper.findAllComponents(Button)[1].trigger("click");
    expect(wrapper.vm.invalidUsername).toBe(true);
  });
  it("Set invalid password to true if the password is empty and the button is pressed", async () => {
    wrapper.vm.username = "NotEmpty";
    wrapper.vm.password = "";
    await wrapper.findAllComponents(Button)[1].trigger("click");
    expect(wrapper.vm.invalidPassword).toBe(true);
  });
  it("Calls login in the auth service when login is clicked", async () => {
    wrapper.vm.username = "NotEmpty";
    wrapper.vm.password = "NotEmpty";
    await wrapper.findAllComponents(Button)[1].trigger("click");
    expect(loginState.login).toHaveBeenCalled();
  });
  it("Emits toggle-mode when the signup button is clicked", async () => {
    await wrapper.findComponent(Button).trigger("click");
    expect(wrapper.emitted("toggle-mode")).toBeTruthy();
  });
});