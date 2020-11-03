import { mount } from '@vue/test-utils'
import GameList from '@/components/GameList.vue'
import App from '@/App.vue'

describe('App.vue', () => {
  it('Has a game list componet', () => {
      const wrapper = mount(App)
      const gameList = wrapper.findComponent(GameList)
    expect(gameList.exists()).toBe(true)
  })
})
