<template>
  <div id="chat">
    <div ref="content" class="content">
      <div class="clrsrc"></div>
      <div v-for="msg in messages" :key="msg.hash" class="message">
        <b class="player" :style="playerStyle(msg.player.name)">{{ msg.player.name  }} : </b>
        <span>{{ msg.message }}</span>
      </div>
    </div>
    <form class="inputs" @submit="send">
      <input type="text" v-model="message" minlength="1" maxlength="255" />
      <button :disabled="!messageValid">
        <div class="icon"></div>
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ChatMessage } from '../store/types'
import Regex from '../utils/Regex'
import socket from '../socket'

@Component
export default class GameUI extends Vue {
  private message = ''

  get messages (): [] {
    return this.$store.state.game.chat.filter((m: ChatMessage) => m)
  }

  get serverRequest () {
    return this.$store.getters.request
  }

  get messageValid () {
    return this.message.length > 1 && this.message.length < 256 && !Regex.IS_EMPTY.test(this.message)
  }

  playerStyle (name: string) {
    let hash = 0
    for (let i = 0; i < name.length; ++i) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash)
    }
    let color = '#'
    for (let i = 0; i < 3; ++i) {
      const value = (hash >> (i * 8) & 0xFF)
      color += ('00' + value.toString(16)).substr(-2)
    }
    return { color }
  }

  send (event: Event) {
    event.preventDefault()
    event.stopPropagation()
    if (!this.messageValid) {
      return
    }
    const request = this.serverRequest
    request.action = 'chat'
    request.data = { message: this.message }
    socket.send(request)
    this.message = ''
  }

  updated () {
    this.$nextTick(function () {
      const el = this.$refs.content as Element
      el.scrollTop = el.scrollHeight
    })
  }
}
</script>

<style lang="scss" scoped>
  @keyframes msg-pop {
    from { transform: translateX(1em); }
    to   { transform: translateX(0em); }
  }
  #chat {
    font-size: .8em;
    left: 2%;
    top: 5%;
    height: 90%;
    width: 40%;
    display: flex;
    flex-direction: column;
    position: absolute;

    .content {
      overflow: hidden;
      height: 100%;
      margin-bottom: .5em;

      .clrsrc {
        height: 100%;
      }

      .message {
        animation: .4s msg-pop;
        color: #fefefe;
        margin-bottom: .2em;
        text-shadow: 0 0.2rem 0.3rem #0003, 0 0.2rem 0 #0003;
        word-break: break-all;
      }
    }

    .inputs {
      display: flex;
      pointer-events: all;

      input {
        margin-right: .2em;
        width: 100%;
      }
    }
  }
</style>
