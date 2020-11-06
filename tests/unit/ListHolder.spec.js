import { mount } from '@vue/test-utils'
import ListHolder from '@/components/ListHolder.vue'
import ListItem from '@/components/ListItem.vue'
import GridItem from '@/components/GridItem.vue'
import Modal from '@/components/Modals/BaseModal.vue'

describe('App.vue', () => {
    let listWrapper
    let gridWrapper

    beforeEach(() => {
        gridWrapper = mount(ListHolder, { props: { showAsList: false } })
        listWrapper = mount(ListHolder, { props: { showAsList: true } })
        gridWrapper.setData({ gamesList: ["game1", "game2", "game3"] })
        listWrapper.setData({gamesList: ["game1", "game2", "game3"]})
    })

    //Basic componets
    it('Has a ListItem componet when showAsList prop is true', () => {
        const listItem = listWrapper.findComponent(ListItem)
        expect(listItem.exists()).toBe(true)
    })
    
    it('Has a GridItem componet when showAsList prop is false', () => {
        const gridItem = gridWrapper.findComponent(GridItem)
        expect(gridItem.exists()).toBe(true)
    })

    it('Has as many ListItem componets as length of gamesList', () => {
      const listItems = listWrapper.findAllComponents(ListItem)
    expect(listItems).toHaveLength(3)
  })
    
    it('Has as many GridItem componets as length of gamesList', () => {
      const gridItems = gridWrapper.findAllComponents(GridItem)
    expect(gridItems).toHaveLength(3)
    })

    it('Has a modal componet', async() => {
        await listWrapper.setData({showModal: true})
        const modal = listWrapper.findComponent(Modal)
        expect(modal.exists()).toBe(true)
    })

    //Clicking on modal causes it to go away
    it('Clicking on the backdrop causes it to no longer be in the DOM', async () => {
        await listWrapper.setData({ showModal: true })
        await listWrapper.findComponent(Modal).trigger('click');
        const modal = listWrapper.findComponent(Modal)
        expect(modal.exists()).toBe(false)

    })
    it('The first button in the modal causes the modal to be removed from the DOM', async () => {
        await listWrapper.setData({ showModal: true })
        await listWrapper.findComponent(Modal).find('button').trigger('click');
        const modal = listWrapper.findComponent(Modal)
        expect(modal.exists()).toBe(false)
    })
    it('The second button in the modal causes the modal to be removed from the DOM', async () => {
        await listWrapper.setData({ showModal: true })
        await listWrapper.findComponent(Modal).find('button.remove').trigger('click');
        const modal = listWrapper.findComponent(Modal)
        expect(modal.exists()).toBe(false)
    })

    //Clicking on items
    it('Opens the modal when an list elment is clicked', async () => {
        await listWrapper.findComponent(ListItem).trigger('click');
        const modal = listWrapper.findComponent(Modal)
        expect(modal.exists()).toBe(true)
    })

    it('Opens the modal when an grid elment is clicked', async () => {
        await gridWrapper.findComponent(GridItem).trigger('click');
        const modal = gridWrapper.findComponent(Modal)
        expect(modal.exists()).toBe(true)
    })

    it('Each grid item stores recives its list index as a prop', () => {
        const item = gridWrapper.findAllComponents(GridItem)[1]
        expect(item.props('index')).toBe(1)
    })

    it('Each list item stores recives its list index as a prop',  () => {
        const item = listWrapper.findAllComponents(ListItem)[1]
        expect(item.props('index')).toBe(1)
    })

    it('Clicking on a grid item sets indexToRemove to the index of that element', async () => {
        await gridWrapper.findAllComponents(GridItem)[1].trigger('click');
        expect(gridWrapper.vm.indexToRemove).toBe(1)
    })

    it('Clicking on a list item sets indexToRemove to the index of that element', async () => {
        await listWrapper.findAllComponents(ListItem)[1].trigger('click');
        expect(listWrapper.vm.indexToRemove).toBe(1)
    })

    //Removing list items
    it('Removes the game at indexToRemove when delete confirmed', async () => {
        await listWrapper.setData({ showModal: true, indexToRemove:1})
        await listWrapper.findComponent(Modal).find('button.remove').trigger('click');
        expect(listWrapper.vm.gamesList).toStrictEqual(["game1", "game3"])
    })
})