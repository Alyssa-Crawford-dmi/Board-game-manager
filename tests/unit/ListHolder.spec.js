import { mount } from '@vue/test-utils'
import ListHolder from '@/components/ListHolder.vue'
import ListView from '@/components/ListView.vue'
import TableView from '@/components/TableView.vue'

describe('App.vue', () => {
  it('Has a ListView componet when showAsList prop is true', () => {
      const wrapper = mount(ListHolder, {props: {showAsList:true}})
      const listView = wrapper.findComponent(ListView)
    expect(listView.exists()).toBe(true)
  })
    it('Has a TableView componet when showAsList prop is false', () => {
      const wrapper = mount(ListHolder, {props: {showAsList:false}})
      const tableView = wrapper.findComponent(TableView)
    expect(tableView.exists()).toBe(true)
  })
})