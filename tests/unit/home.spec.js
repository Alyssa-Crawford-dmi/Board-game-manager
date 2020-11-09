import { mount } from "@vue/test-utils";
import Header from "@/components/Header.vue";
import ListHolder from "@/components/ListHolder.vue";
import Home from "@/views/Home.vue";

describe("App.vue", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(Home);
  });

  it("Has a header componet", () => {
    const header = wrapper.findComponent(Header);
    expect(header.exists()).toBe(true);
  });
  it("Has a ListHolder", () => {
    const listHolder = wrapper.findComponent(ListHolder);
    expect(listHolder.exists()).toBe(true);
  });
  it("clicking the toggleView button changes the value passed to listHolder", async () => {
    const listHolder = wrapper.findComponent(ListHolder);
    const intialValue = listHolder.props("showAsList");
    await wrapper
      .findComponent(Header)
      .find("button.toggleView")
      .trigger("click");
    const oneClick = listHolder.props("showAsList");
    await wrapper
      .findComponent(Header)
      .find("button.toggleView")
      .trigger("click");
    const twoClicks = listHolder.props("showAsList");

    expect(intialValue !== oneClick).toBe(true);
    expect(intialValue === twoClicks).toBe(true);
    expect(oneClick !== twoClicks).toBe(true);
  });
});
