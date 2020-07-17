import { Module, MutationTree, GetterTree, ActionTree } from 'vuex'
import { ProfileStateSettings, RootState, Resolution } from '../types'
import { WEBGL } from 'three/examples/jsm/WebGL'

const namespaced = false

const state: ProfileStateSettings = {
  resolutionH: 640,
  resolutionV: 360,
  antialias: false,
  volume: 0.666,
  webGL: WEBGL.isWebGL2Available() ? 'webgl2' : WEBGL.isWebGLAvailable() ? 'webgl' : 'unavailable'
}

const getters: GetterTree<ProfileStateSettings, RootState> = {
  resolutionRatio (state): number {
    return state.resolutionH / state.resolutionV
  },
  resolution (state): Resolution {
    return {
      width: state.resolutionH,
      height: state.resolutionV
    }
  }
}

const mutations: MutationTree<ProfileStateSettings> = {
  SET_RESOLUTION_H (state, horizontal) {
    state.resolutionH = horizontal
  },
  SET_RESOLUTION_V (state, vertical) {
    state.resolutionV = vertical
  },
  SET_ANTIALIASING (state, enable) {
    state.antialias = enable
  },
  SET_VOLUME (state, volume) {
    state.volume = Math.max(0, Math.min(1, volume))
  },
  SET_WEBGL_VERSION (state, version) {
    state.webGL = version
  }
}

const actions: ActionTree<ProfileStateSettings, RootState> = {
  setResolution ({ commit }, { width, height }: Resolution) {
    commit('SET_RESOLUTION_H', width)
    commit('SET_RESOLUTION_V', height)
  },
  setAntialiasing ({ commit }, bool: boolean) {
    commit('SET_ANTIALIASING', bool)
  },
  setVolume ({ commit }, volume: number) {
    commit('SET_VOLUME', volume)
  },
  toggleVolume ({ commit, state }) {
    const volume = (Math.floor(state.volume * 3 + 1) % 4) / 3
    commit('SET_VOLUME', volume)
  },
  setWebGL ({ commit }, webGL: 'webgl' | 'webgl2' | 'unavailable') {
    commit('SET_WEBGL_VERSION', webGL)
  }
}

const SettingsModule: Module<ProfileStateSettings, RootState> = {
  namespaced,
  state,
  getters,
  mutations,
  actions
}

export default SettingsModule
