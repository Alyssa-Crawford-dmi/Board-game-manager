import { mount } from "@vue/test-utils";
import simpleTest from "@/components/simpleTest";

describe("simpleTest.vue", () => {
  it("Renders without an error", () => {
    const wrapper = mount(simpleTest);
    expect(wrapper.exists()).toBe(true);
  });
});
