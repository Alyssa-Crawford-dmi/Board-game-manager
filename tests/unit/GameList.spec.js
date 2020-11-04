import { mount } from '@vue/test-utils'
import GameList from '@/components/GameList.vue'
import Game from '@/components/Game.vue'

describe('GameList.vue', () => {
    it('Makes one game componet for each item in the games list passed as a prop', () => {
        const games = ['fake', 'game', 'list']
        const wrapper = mount(GameList, {
            props: {
            games
        }});
        const gameComps = wrapper.findAllComponents(Game)
        expect(gameComps).toHaveLength(games.length)
    })
})