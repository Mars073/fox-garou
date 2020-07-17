<template>
  <div class="overlay">
    <div id="latency">
      <span class="icon" :style="{ color: latency < 35 ? 'lime' : latency < 75 ? 'orange' : 'red' }"></span>
      <span>{{ latency }} ms</span>
    </div>
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import socket from '@/socket'

@Component
export default class GameOverlay extends Vue {
  private pinger = 0

  get serverRequest () {
    return this.$store.getters.requestSimple
  }

  get latency () {
    return this.$store.getters.latency
  }

  mounted () {
    this.pinger = setInterval(() => {
      if (this.$store.state.game.connected) {
        const request = this.serverRequest
        request.action = 'ping'
        request.data = { timestamp: +new Date() }
        socket.send(request)
      }
    }, 1000)
  }

  beforeDestroy () {
    clearInterval(this.pinger)
  }
}
</script>

<style lang="scss" scoped>
  #latency {
    color: #fff;
    font-size: .8em;
    text-shadow: .1em .1em 0 #000;
    position: absolute;
    left: 2%;
    top: 2%;

    .icon {
      margin-right: .2em;
    }
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
