import { mount } from '@vue/test-utils'
import Header from '@/components/Header.vue'
import ListHolder from '@/components/ListHolder.vue'
import App from '@/App.vue'

describe('App.vue', () => {
  it('Has a header componet', () => {
      const wrapper = mount(App)
      const header = wrapper.findComponent(Header)
    expect(header.exists()).toBe(true)
  })
  it('Has a ListHolder', () => {
      const wrapper = mount(App)
      const listHolder = wrapper.findComponent(ListHolder)
    expect(listHolder.exists()).toBe(true)
  })
})
