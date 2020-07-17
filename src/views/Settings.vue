<template>
  <div class="settings">
    <div class="modal">
      <a class="close icon" aria-label="Fermer" @click="close"></a>
      <table>
      <tr>
        <th>
          <span class="icon"></span>
          <span>Résolution</span>
        </th>
        <td>
          <fg-select v-model="resolution" :options="resolutions" :equals="(a, b) => a.width == b.width && a.height == b.height" />
        </td>
      </tr>
      <tr>
        <th>
          <span class="icon"></span>
          <span>Ver. WebGL</span>
        </th>
        <td>
          <fg-select v-model="webGL" :options="webGLs" :equals="(a, b) => a === b" />
        </td>
      </tr>
      <tr>
        <th>
          <span class="icon"></span>
          <span>Anti-aliasing</span>
        </th>
        <td>
          <input id="anti-aliasing" type="checkbox" v-model="hasAntialiasing" />
          <label for="anti-aliasing">{{ hasAntialiasing ? 'activé' : 'désactivé' }}</label>
        </td>
      </tr>
      <tr>
        <th>
          <span class="icon">{{ volume == 0 ? '' : volume &lt;= 1/3 ? '' : volume &lt;= 1 / 1.5 ? '' : '' }}</span>
          <span>Volume</span>
        </th>
        <td>
          <fg-range min="2" max="10" step="2" v-model="volume"/>
        </td>
      </tr>
      </table>
      <div class="buttons">
        <button class="success" @click="save">Valider</button>
        <button class="danger" @click="close">Annuler</button>
      </div>
    </div>
    <div class="shadow"></div>
  </div>
</template>

<script>
import FgSelect from '../components/inputs/FgSelect.vue'
import FgRange from '../components/inputs/FgRange.vue'
import { RESOLUTIONS } from '../utils/Constant'

export default {
  name: 'settings',
  components: { FgSelect, FgRange },
  data () {
    return {
      resolution: {},
      hasAntialiasing: false,
      webGL: undefined,
      volume: 0
    }
  },
  computed: {
    resolutions () {
      const res = {}
      RESOLUTIONS.forEach(r => { res[r.width + 'x' + r.height] = r })
      return res
    },
    webGLs () {
      return {
        webGL: 'webgl',
        webGL2: 'webgl2'
      }
    },
    currentResolution () {
      return this.$store.getters.resolution
    },
    currentHasAntialiasing () {
      return this.$store.state.settings.antialias
    },
    currentWebGL () {
      return this.$store.state.settings.webGL
    },
    currentVolume () {
      return this.$store.state.settings.volume
    }
  },
  methods: {
    close () {
      this.$router.push('/')
    },
    save () {
      this.$store.dispatch('setResolution', this.resolution)
      this.$store.dispatch('setAntialiasing', this.hasAntialiasing)
      this.$store.dispatch('setVolume', this.volume)
      this.$store.dispatch('setWebGL', this.webGL)
      this.close()
    }
  },
  mounted () {
    this.resolution = this.currentResolution
    this.hasAntialiasing = this.currentHasAntialiasing
    this.webGL = this.currentWebGL
    this.volume = this.currentVolume
  }
}
</script>

<style lang="scss" scoped>
  .settings {
    color: #efefef;
    font-size: .8em;
    text-shadow: 0 0.2rem 0.3rem #0003, 0 0.2rem 0 #0003;
    pointer-events: all;
    user-select: none;

    .modal {
      background: #d97e2e linear-gradient(#d97e2e, #c46817);
      border: .2em solid #282d31;
      border-radius: .3em;
      box-shadow: 0 0.1em 0 #0002, inset 0 0 .4em #fff3, inset 0.02em .05em 0 .05em #fff3;
      padding: .4em 1em;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      z-index: 100;

      &::before{
        content: ' ';
        border: .3em solid transparent;
        border-left-color: #282d31;
        border-left-width: .15em;
        position: absolute;
        width: 0;
        height: 0;
        left: 0;
        top: 25%;
      }
      &::after {
        content: ' ';
        border: .3em solid transparent;
        border-right-color: #282d31;
        border-right-width: .15em;
        position: absolute;
        width: 0;
        height: 0;
        right: 0;
        top: 55%;
      }

      .close {
        background: #f00;
        border-radius: 100%;
        box-shadow: 0 .1em 0 #0003, inset 0 0 .2em #fff6;
        color: #fff;
        display: block;
        height: 1.2em;
        width: 1.2em;
        overflow: hidden;
        position: absolute;
        right: 0;
        top: 0;
        text-align: center;
        text-shadow: 0.1em 0.2em 0 #0003, 0 0 0em #fff;
        transform: translate(50%, -50%);
        transition: transform .2s, text-shadow .2s;

        &::before {
          background: #fff6;
          border-radius: 100%;
          box-shadow: 0 0 .2em #fff3;
          content: ' ';
          position: absolute;
          left: 0;
          top: 0;
          height: 40%;
          width: 90%;
          transform-origin: 50% 100%;
          transform: rotate(-35deg);
          transition: height .1s;
        }

        &:hover {
          box-shadow: 0 .2em .1em #0003, inset 0 0 .2em #fff6;
          transform: translate(50%, -51.2%);
          text-shadow: 0em 0em 0 #0003, 0 0 .2em #fff;
          transition: transform .1s, text-shadow .1s, box-shadow .1s;

          &::before {
            height: 60%;
            width: 90%;
            transition: height .1s;
          }
        }

        &:active {
          box-shadow: 0 .1em 0 #0003, inset 0 0 .2em #0006;
          transform: translate(50%, -49%);
          transition: transform .1s text-shadow .1s;
          text-shadow: 0 .1em 0 #0003;

          &::before {
            left: -50%;
            top: -50%;
            transition: left .1s, top .1s;
          }
        }
      }

      table {
        margin: 1em .4em 0 .4em;

        th {
          font-weight: normal;
          text-align: left;
          white-space: nowrap;

          &::after {
            content: ':';
          }

          .icon {
            display: inline-block;
            text-align: center;
            width: 2em;
          }
        }

        td {
          padding-left: 1em;
        }
      }

      input[type='range'] {
        box-shadow: none;
        width: 100%;
      }

      .buttons {
        display: flex;
        justify-content: flex-end;
        margin-right: -.2em;

        button:not(:last-of-type) {
          margin-right: .4em;
        }
      }
    }
    .shadow {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background: #0006;
      z-index: 10;
    }
  }
</style>
