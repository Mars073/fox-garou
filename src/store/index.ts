import Vue from 'vue'
import Vuex from 'vuex'
import { RootState } from './types'
import settings from './modules/settings'
import game from './modules/game'

Vue.use(Vuex)

export default new Vuex.Store<RootState>({
  state: { version: '1.0.0' },
  mutations: { },
  actions: { },
  modules: {
    settings,
    game
  }
})
