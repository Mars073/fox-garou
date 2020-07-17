<template>
  <div class="game" :style="{ fontSize }">
    <game-render v-if="gameIsRunning" class="game-layer" :style="gameResolution" style="z-index: 10" />
    <game-u-i class="game-layer" :style="gameResolution" style="z-index: 100" />
    <game-overlay class="game-layer" :style="gameResolution" style="z-index: 1000" />
  </div>
</template>

<script>
import GameRender from '@/components/GameLayers/GameRender.vue'
import GameUI from '@/components/GameLayers/GameUI.vue'
import GameOverlay from '@/components/GameLayers/GameOverlay.vue'

export default {
  name: 'Game',
  components: {
    GameRender, GameUI, GameOverlay
  },
  data () {
    return {
      gameResolution: {},
      fontSize: '16px'
    }
  },
  methods: {
    async onResize () {
      // if (this.resolutionH < 0 || this.resolutionV < 0) { return }
      this.gameResolution = this.evaluateResolution()
      const height = this.gameResolution.height.match(/^(?<value>\d+(?:\.\d+)?)(?<unit>[^\d]+)$/)
      if (height) {
        this.fontSize = Math.round(+height.groups.value / 2.8) / 10 + height.groups.unit
      }
      // this.fontSize = Math.round(this.$refs.gameUI.$el.offsetHeight / 30) + 'px'
    },
    evaluateResolution () {
      if (this.resolutionH < 0 || this.resolutionV < 0) {
        return {
          left: 0,
          top: 0,
          width: '100vw',
          height: '100vh',
          transform: 'none'
        }
      }
      if (this.resolutionRatio > this.viewRatio) {
        return {
          width: '100vw',
          height: Math.round(100 / this.resolutionRatio) + 'vw'
        }
      }
      return {
        width: Math.round(100 * this.resolutionRatio) + 'vh',
        height: '100vh'
      }
    }
  },
  computed: {
    gameIsRunning () {
      return this.$store.getters.isRunning
    },
    resolutionH () {
      return this.$store.state.settings.resolutionH
    },
    resolutionV () {
      return this.$store.state.settings.resolutionV
    },
    resolutionRatio () {
      return this.$store.getters.resolutionRatio
    },
    viewRatio: {
      cache: false,
      get: function () {
        return window.innerWidth / window.innerHeight
      }
    }
  },
  watch: {
    resolutionH () {
      this.onResize()
    },
    resolutionV () {
      this.onResize()
    }
  },
  mounted () {
    addEventListener('resize', this.onResize)
    // this.gameResolution = this.evaluateResolution()
    this.onResize()
  },
  beforeDestroy () {
    removeEventListener('resize', this.onResize)
  }
}
</script>

<style lang="scss" scoped>
.game {
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  .game-layer {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
  }
}
</style>
