<template>
  <div id="portal">
    <img id="logo" src="../assets/logo.svg" />
    <div class="form">
      <template v-if="gameState == 'loading'">
        loading...
      </template>
      <template v-else>
        <input v-model="username" placeholder="Username..." :pattern="unPattern" :disabled="isPending" required/>
        <button @click="play" :disabled="isPending || !validUser">
          <span>Jouer</span>
          <span class="icon right"></span>
        </button>
      </template>
    </div>
    <div class="description">Ut imperdiet ipsum sodales sem tempor, non tristique enim posuere. Ut ac dui tellus. Aliquam ornare varius nibh at tincidunt. Ut condimentum hendrerit ultrices.</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import Regex from '@/utils/Regex'
import socket from '../socket'

@Component
export default class Portal extends Vue {
  private username = ''
  private validUser = false
  private unPattern = Regex.toHTMLPattern(Regex.IS_USERNAME)

  get gameIsRunning () {
    return this.$store.getters.isRunning
  }

  get isPending () {
    return this.$store.getters.isPending
  }

  get serverRequest () {
    return this.$store.getters.request
  }

  get gameState () {
    return this.$store.state.game.state
  }

  play () {
    this.username = this.username.trim()
    if (this.validUser) {
      const request = this.serverRequest
      request.action = 'join'
      request.data = { username: this.username }
      socket.send(request)
      this.$store.dispatch('setState', 'pending')
    }
  }

  @Watch('username')
  onUsernameChange (value: string) {
    this.validUser = false
    const name = value.replace(/\s{2,}/, ' ')
    if (name === value) {
      this.validUser = Regex.IS_USERNAME.test(name)
    } else {
      this.username = name
    }
  }
}
</script>

<style lang="scss">
  #portal {
    height: 100%;
    padding-left: 50%;
    background: url(../assets/background.png) no-repeat left top / cover;
    text-align: center;

    #logo {
      margin: 5%;
      width: 60%;
    }

    .description {
      color: #fefefe;
      font-size: 100%;
      text-align: justify;
      margin: 0 10%;
      text-shadow: 0 .2rem .3rem #0003, 0 .2rem 0 #0003;
    }

    .form {
      display: flex;
      justify-content: center;
      margin-bottom: 8%;

      input, button {
        pointer-events: all;
      }

      &>:not(:first-child) {
        margin-left: .8em;
      }
    }
  }
</style>
