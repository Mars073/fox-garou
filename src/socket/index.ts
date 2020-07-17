import Vue from 'vue'
import Socket from '@/plugins/Socket'
import { Response, Disptacher } from './types'
import store from '../store'
import { DOMAIN } from '@/utils/Constant'

Vue.use(Socket)

export default new Socket.Socket({
  host: DOMAIN,
  port: 8093,

  open () {
    store.dispatch('isConnected', true)
    if (localStorage.getItem('player.uuid') && localStorage.getItem('player.token')) {
      // this.send() // todo : resume
    }
  },
  close () {
    store.dispatch('isConnected', false)
  },
  async message (msg) {
    try {
      // console.log(msg.data)
      const response = JSON.parse(msg.data) as Response
      switch (response.type) {
        case 'pong':
          store.dispatch('setLatency', +new Date() - response.data.timestamp)
          break
        case 'player':
          store.dispatch('setID', response.data.uuid)
          store.dispatch('setToken', response.data.private_token)
          break
        case 'dispatch':
          {
            const disptacher = response.data as Disptacher
            store.dispatch(disptacher.action, disptacher.payload)
          }
          break
        case 'error':
          console.error('socket', response.data)
      }
    } catch {
      console.error('the server sent a malformed message')
    }
  }
})
