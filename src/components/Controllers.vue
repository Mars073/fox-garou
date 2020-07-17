<template>
  <aside class="controllers">
    <button @click="toggleVolume">
      <span class="icon">{{ volume == 0 ? '' : volume &lt;= 1/3 ? '' : volume &lt;= 1 / 1.5 ? '' : '' }}</span>
    </button>
    <button @click="toggleFullscreen">
      <span class="icon">{{ fullscreen ? '' : '' }}</span>
    </button>
    <button @click="openSettings">
      <span class="icon"></span>
    </button>
  </aside>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Controllers extends Vue {
  private fullscreen = false

  get volume () {
    return this.$store.state.settings.volume
  }

  checkFullscreen () {
    this.fullscreen = document.fullscreenElement != null
  }

  toggleFullscreen () {
    if (this.fullscreen) {
      document.exitFullscreen()
    } else {
      document.documentElement.requestFullscreen()
    }
  }

  toggleVolume () {
    this.$store.dispatch('toggleVolume')
  }

  openSettings () {
    this.$router.push('/settings')
  }

  mounted () {
    addEventListener('resize', this.checkFullscreen)
  }

  beforeDestroy () {
    removeEventListener('resize', this.checkFullscreen)
  }
}
</script>

<style lang="scss" scoped>
  .controllers {
    display: flex;
    font-size: 1.2em;
    position: absolute;
    right: 5%;
    bottom: 5%;

    & > * {
      margin: 0 .2em;
      pointer-events: all;
    }
  }
</style>
