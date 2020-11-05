import { mount } from '@vue/test-utils'
import ListHolder from '@/components/ListHolder.vue'
import ListItem from '@/components/ListItem.vue'
import GridItem from '@/components/GridItem.vue'
import Modal from '@/components/Modal.vue'

describe('App.vue', () => {

    //Basic componets
    it('Has a ListItem componet when showAsList prop is true', () => {
        const wrapper = mount(ListHolder, {props: {showAsList:true}})
        const listItem = wrapper.findComponent(ListItem)
        expect(listItem.exists()).toBe(true)
    })
    
    it('Has a GridItem componet when showAsList prop is false', () => {
        const wrapper = mount(ListHolder, {props: {showAsList:false}})
        const gridItem = wrapper.findComponent(GridItem)
        expect(gridItem.exists()).toBe(true)
    })

    it('Has as many ListItem componets as length of gamesList', () => {
      const wrapper = mount(ListHolder, {props: {showAsList:true}})
      const listItems = wrapper.findAllComponents(ListItem)
    expect(listItems).toHaveLength(3)
  })
    
    it('Has as many GridItem componets as length of gamesList', () => {
      const wrapper = mount(ListHolder, {props: {showAsList:false}})
      const gridItems = wrapper.findAllComponents(GridItem)
    expect(gridItems).toHaveLength(3)
    })

    it('Has a modal componet', async() => {
        const wrapper = mount(ListHolder)
        await wrapper.setData({showModal: true})
        const modal = wrapper.findComponent(Modal)
        expect(modal.exists()).toBe(true)
    })

    //Clicking on modal causes it to go away
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
        await wrapper.findComponent(Modal).find('button.remove').trigger('click');
        const modal = wrapper.findComponent(Modal)
        expect(modal.exists()).toBe(false)
    })

    //Clicking on items
    it('Opens the modal when an list elment is clicked', async () => {
        const wrapper = mount(ListHolder, { props: { showAsList: true } })
        await wrapper.findComponent(ListItem).trigger('click');
        const modal = wrapper.findComponent(Modal)
        expect(modal.exists()).toBe(true)
    })

    it('Opens the modal when an grid elment is clicked', async () => {
        const wrapper = mount(ListHolder, { props: { showAsList: false } })
        await wrapper.findComponent(GridItem).trigger('click');
        const modal = wrapper.findComponent(Modal)
        expect(modal.exists()).toBe(true)
    })

    it('Each grid item stores recives its list index as a prop', () => {
        const wrapper = mount(ListHolder, { props: { showAsList: false } })
        const item = wrapper.findAllComponents(GridItem)[1]
        expect(item.props('index')).toBe(1)
    })

    it('Each list item stores recives its list index as a prop',  () => {
        const wrapper = mount(ListHolder, { props: { showAsList: true } })
        const item = wrapper.findAllComponents(ListItem)[1]
        expect(item.props('index')).toBe(1)
    })

    it('Clicking on a grid item sets indexToRemove to the index of that element', async () => {
        const wrapper = mount(ListHolder, { props: { showAsList: false } })
        await wrapper.findAllComponents(GridItem)[1].trigger('click');
        expect(wrapper.vm.indexToRemove).toBe(1)
    })

    it('Clicking on a grid item sets indexToRemove to the index of that element', async () => {
        const wrapper = mount(ListHolder, { props: { showAsList: true } })
        await wrapper.findAllComponents(ListItem)[1].trigger('click');
        expect(wrapper.vm.indexToRemove).toBe(1)
    })

    //Removing list items
    it('Removes the game at indexToRemove when delete confirmed', async () => {
        const wrapper = mount(ListHolder)
        await wrapper.setData({ showModal: true, indexToRemove:1})
        await wrapper.findComponent(Modal).find('button.remove').trigger('click');
        expect(wrapper.vm.gamesList).toStrictEqual(["game1", "game3"])
    })
})