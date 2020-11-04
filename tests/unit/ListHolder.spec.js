import { mount } from '@vue/test-utils'
import ListHolder from '@/components/ListHolder.vue'
import ListView from '@/components/ListView.vue'
import TableView from '@/components/TableView.vue'
import Modal from '@/components/Modal.vue'

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

    it('Has a modal componet', async() => {
        const wrapper = mount(ListHolder)
        await wrapper.setData({showModal: true})
        const modal = wrapper.findComponent(Modal)
        expect(modal.exists()).toBe(true)
    })
    it('Clicking on the backdrop causes it to no longer be in the DOM', async () => {
        const wrapper = mount(ListHolder)
        await wrapper.setData({ showModal: true })
        await wrapper.findComponent(Modal).trigger('click');
        const modal = wrapper.findComponent(Modal)
        expect(modal.exists()).toBe(false)

    })
    it('The first button in the modal causes the modal to be removed from the DOM', async () => {
        const wrapper = mount(ListHolder)
        await wrapper.setData({ showModal: true })
        await wrapper.findComponent(Modal).find('button').trigger('click');
        const modal = wrapper.findComponent(Modal)
        expect(modal.exists()).toBe(false)
    })
    it('The second button in the modal causes the modal to be removed from the DOM', async () => {
        const wrapper = mount(ListHolder)
        await wrapper.setData({ showModal: true })
        await wrapper.findComponent(Modal).trigger('click', { button: 1 });
        const modal = wrapper.findComponent(Modal)
        expect(modal.exists()).toBe(false)
    })
})