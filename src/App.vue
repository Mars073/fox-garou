<template>
  <div id="app" @mousedown="preventClick" @contextmenu="preventClick" :class="{ 'is-active': isActive }">
    <router-view v-if="connected" />
    <div v-else class="network-error">
      <h1><span class="icon"></span> Déconnecté</h1>
      <span>Impossible de se connecter au serveur de jeu. <a @click="reconnect">Réessayer</a>.</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import socket from './socket'

export default Vue.extend({
  data () {
    return {
      isActive: false
    }
  },
  computed: {
    connected () {
      return this.$store.state.game.connected
    }
  },
  methods: {
    onLoad () {
      this.isActive = document.readyState === 'complete'
    },
    preventClick (event: MouseEvent) {
      if (event.type === 'contextmenu' || event.buttons === 2) {
        event.preventDefault()
        event.stopPropagation()
      }
    },
    reconnect () {
      socket.reconnect()
    }
  },
  mounted () {
    document.addEventListener('readystatechange', this.onLoad)
    setTimeout(() => this.onLoad(), 100)
  },
  beforeDestroy () {
    document.removeEventListener('readystatechange', this.onLoad)
  }
})
</script>

<style lang="scss">
  @font-face {
    font-family: 'fontello';
    src: url('./assets/font/fontello.eot?12595541');
    src: url('./assets/font/fontello.eot?12595541#iefix') format('embedded-opentype'),
          url('./assets/font/fontello.woff?12595541') format('woff'),
          url('./assets/font/fontello.ttf?12595541') format('truetype'),
          url('./assets/font/fontello.svg?12595541#fontello') format('svg');
    font-weight: normal;
    font-style: normal;
  }

  #app {
    opacity: 0;
    transition: .5s opacity;

    &.is-active {
      opacity: 1;
    }
  }

  input,
  textarea {
    border: none;
    border-radius: .4em .4em .6em .4em;
    box-shadow: inset .1em .2em 0 0 #bbb, inset 0 .2em 0 0 #bbb;
    font-family: 'Carter One', cursive;
    font-size: .8em;
    padding: .4em 1em .2em 1em;
  }

  input[type='checkbox'] {
    display: none;

    & + label {
      padding-left: 1em;
      position: relative;

      &::before {
        background: #303030 linear-gradient(#454545, #303030);
        border: .1em solid #282d31;
        border-radius: .16em;
        box-shadow: inset 0 0 .1em #454545;
        display: inline-block;
        content: ' ';
        height: .6em;
        width: .6em;
        transform: skewX(-2deg) skewY(-3deg);
        position: absolute;
        left: 0;
        top: .4em;
      }

      &::after {
        font-family: "fontello";
        font-size: .8em;
        content: '';
        position: absolute;
        left: .2em;
        top: .3em;
        transform: scale(0);
        transition: transform .0s;
      }
    }
    &:checked + label::after {
      transform: scale(1);
      transition: transform .1s;
    }
  }

  button {
    background: #d97e2e;
    border-color: #282d31;
    border-radius: .5em;
    border-width: .1em;
    box-shadow: 0 .1em 0 #0002;
    color: #FFF;
    font-size: .8em;
    font-family: 'Carter One', cursive;
    padding: .2em .8em;
    text-shadow: .1em .2em 0 #0003, 0 0 .0em #fff;
    text-transform: uppercase;
    min-width: 2.8em;
    overflow: hidden;
    position: relative;
    filter: grayscale(.0);
    transition: text-shadow .5s, filter .3s;

    &::before {
      content: ' ';
      background-color: #0000;
      border-radius: .4em/.6em;
      box-shadow: 0 0 0 2em #0003;
      position: absolute;
      left: 3%;
      top: -4%;
      height: 90%;
      width: 90%;
      transform: rotate(3.2deg);
      transition: background-color .5s, transform .5s;
    }
    &::after {
      content: ' ';
      border: .2em solid transparent;
      border-left-color: #282d31;
      border-left-width: .1em;
      position: absolute;
      width: 0;
      height: 0;
      left: 0;
      top: 25%;
    }

    &:focus,
    &:hover {
      outline: none;
      text-shadow: .0em .0em 0 #0003, 0 0 .2em #fff;
      transition: text-shadow .2s;

      &::before {
        box-shadow: 0 0 0 2em #0002;
        transform: rotate(0deg);
        transition: transform .2s box-shadow .2s;
      }
    }
    &:active {
      padding: .3em .7em .1em .9em;
      text-shadow: .0em .0em 0 #0003, 0 0 .0em #fff;
      transition: padding .1s, text-shadow .1s;

      &::before {
        background-color: #0001;
        left: 6%;
        top: 2%;
        transform: rotate(0deg);
        transition: background-color .1s, transform .1s, left .1s, top .1s;
      }
    }
    &:disabled {
      pointer-events: none!important;
      filter: grayscale(.8);
      transition: filter .3s;
    }
    &.danger {
      background-color: #d92e2e;
    }
    &.success {
      background-color: #4eb707;
    }

    :not(:disabled) * {
      pointer-events: all;
      vertical-align: baseline;
    }
    :not(:active):first-child::before {
      background-color: #fff3;
      border-radius: 30%;
      box-shadow: 0 0 .3em .1em #fff3;
      content: ' ';
      position: absolute;
      left: 5%;
      top: 4%;
      height: 50%;
      width: 70%;
      transform: rotate(1.2deg);
    }

    .icon {
      &.left {
        margin-right: .3em;
      }
      &.right{
        margin-left: .3em;
      }
    }
  }

  [class~='icon'] {
    font-family: "fontello";
  }

  .network-error {
    color: #fff;
    font-size: 16pt;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    text-align: center;

    .icon {
      color: #ff0;
    }
  }

  a {
    color: #007cff;
  }

  * {
    box-sizing: border-box;
    scroll-behavior: smooth;
  }

  :not(a), :not(button) {
    cursor:
      url('./assets/cursors/default.svg'),
      url('./assets/cursors/default.png'),
      /* url('./assets/cursors/default.cur'),
      url('./assets/cursors/default.gif'),*/
      default;
  }

  a, button {
    cursor:
      url('./assets/cursors/pointer.svg'),
      url('./assets/cursors/pointer.png'),
      /* url('./assets/cursors/pointer.cur'),
      url('./assets/cursors/pointer.gif'),*/
      pointer;
  }
</style>
