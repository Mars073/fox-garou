import { Module, MutationTree, GetterTree, ActionTree } from 'vuex'
import { ProfileStateGame, RootState, PlayerInfo, ChatMessage } from '../types'
import { v4 as uuidv4 } from 'uuid'
import World from '@/world/World'
import { Request } from '@/socket/types'
import { LATENCY_AVG_SIZE, CHAT_SIZE } from '@/utils/Constant'

const namespaced = false

const state: ProfileStateGame = {
  connected: true,
  world: null,
  uuid: uuidv4(),
  username: '',
  token: '',
  state: 'register',
  latency: new Array(LATENCY_AVG_SIZE) as number[],
  chat: new Array(CHAT_SIZE) as ChatMessage[]
}

const getters: GetterTree<ProfileStateGame, RootState> = {
  world (state): World {
    if (!state.world) {
      state.world = new World()
    }
    return state.world
  },
  isRunning (state): boolean {
    return state.state === 'in_game'
  },
  isPending (state): boolean {
    return state.state === 'pending'
  },
  request (state): Request {
    return {
      player: state.uuid,
      action: 'default',
      token: state.token
    }
  },
  requestSimple (state): Request {
    return {
      player: state.uuid,
      action: 'default'
    }
  },
  latency (state): number | string {
    const length = state.latency.reduce(a => a + 1, 0)
    return length <= 0 ? '-' : Math.round(state.latency.reduce((a, c) => a + c, 0) / length)
  }
}

const mutations: MutationTree<ProfileStateGame> = {
  SET_UUID (state, uuid) {
    state.uuid = uuid
  },
  SET_USERNAME (state, username) {
    state.username = username
  },
  SET_TOKEN (state, token) {
    state.token = token
  },
  SET_STATE (state, _state) {
    state.state = _state
  },
  IS_RUNNING (state, bool) {
    state.state = bool ? 'in_game' : 'register'
  },
  IS_CONNECTED (state, bool) {
    state.connected = bool
  },
  SET_LATENCY (state, ms) {
    state.latency.shift()
    state.latency.push(ms)
  },
  ADD_CHAT_MESSAGE (state, chatMessage) {
    state.chat.shift()
    state.chat.push(chatMessage)
  }
}

const actions: ActionTree<ProfileStateGame, RootState> = {
  setID ({ commit }, uuid: string): void {
    commit('SET_UUID', uuid)
  },
  setUsername ({ commit }, username: string): void {
    commit('SET_USERNAME', username)
  },
  setToken ({ commit }, token: string): void {
    commit('SET_TOKEN', token)
  },
  async setState ({ commit, getters, state }, _state: 'register' | 'pending' | 'loading' | 'in_game'): Promise<void> {
    commit('SET_STATE', _state)
    if (_state === 'loading') {
      if (!state.world) {
        state.world = new World()
      }
      await World.loadBasicRessources()
      console.log('loaded')
      if (state.state === 'loading') {
        commit('SET_STATE', 'in_game')
        getters.world.playCamera()
      }
    }
  },
  isRunning ({ commit }, bool: boolean): void {
    commit('IS_RUNNING', bool)
  },
  isConnected ({ commit }, bool: boolean): void {
    commit('IS_CONNECTED', bool)
  },
  setLatency ({ commit }, ms: number) {
    if (ms >= 0) {
      commit('SET_LATENCY', ms)
    }
  },
  addPlayer ({ state, commit, getters }, player: PlayerInfo): void {
    if (!state.world?.players.some(p => p.userData.uuid === player.uuid)) {
      commit('ADD_PLAYER', { player, getters })
    }
  },
  addChatMessage ({ commit }, message: ChatMessage) {
    commit('ADD_CHAT_MESSAGE', message)
  }
}

const GameModule: Module<ProfileStateGame, RootState> = {
  namespaced,
  state,
  getters,
  mutations,
  actions
}

export default GameModule
