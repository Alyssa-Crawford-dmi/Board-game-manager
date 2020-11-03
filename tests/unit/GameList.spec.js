import { mount } from '@vue/test-utils'
import GameList from '@/components/GameList.vue'
import Game from '@/components/Game.vue'

describe('GameList.vue', () => {
    it('Makes one game componet for each item in the games list passed as a prop', () => {
        const wrapper = mount(GameList);
        const games = wrapper.findAllComponents(Game)
        expect(games).toHaveLength(1)
    })
})