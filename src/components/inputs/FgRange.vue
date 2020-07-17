<template>
  <div class="input-range" tabindex="0">
    <div ref="bar" class="bar"></div>
    <div class="cursor" @mousedown="activate" :class="{ 'is-active': isActive }"
      :style="{ left: (percent * 100) + '%' }"></div>
    <span class="débug">{{ debug }}</span>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Model, Prop } from 'vue-property-decorator'

@Component
export default class FgRange extends Vue {
  @Model('change') readonly value: number | undefined
  @Prop({ default: 0 }) readonly min!: number
  @Prop({ default: 100 }) readonly max!: number
  @Prop({ default: 1 }) readonly step!: number
  private isActive = false
  private percent = 0
  private debut!: number

  activate () {
    this.isActive = true
  }

  desactivate () {
    this.isActive = false
  }

  setPercent (percent: number) {
    const normalized = Math.max(0, Math.min(1, percent))
    this.percent = normalized
  }

  onMousemove ({ clientX }: MouseEvent) {
    if (this.isActive) {
      const { x, width } = (this.$refs.bar as HTMLElement).getBoundingClientRect()
      const d = clientX - x
      this.setPercent(d / width)
    }
  }

  mounted () {
    addEventListener('mouseup', this.desactivate)
    addEventListener('mouseleave', this.desactivate)
    addEventListener('mousemove', this.onMousemove)
  }

  beforeDestroy () {
    removeEventListener('mouseup', this.desactivate)
    removeEventListener('mouseleave', this.desactivate)
    removeEventListener('mousemove', this.onMousemove)
  }
}
</script>

<style lang="scss" scoped>
  .dabug {
    color: #f00;
    position: absolute;
  }

  .input-range {
    margin: .4em;
    padding: 0 .2em;
    position: relative;

    .bar {
      background: #303030 linear-gradient(#454545, #303030);
      border: 0.1em solid #282d31;
      border-radius: .06em;
      box-shadow: inset 0 0 0.1em #454545;
      height: .2em;
      transform: skewX(-8deg) skewY(-.8deg);
    }

    .cursor {
      background: #fff;
      border: 0.1em solid #282d31;
      border-radius: 100%;
      box-shadow: 0 .1em 0 #0002;
      height: .7em;
      width: .7em;
      left: 0;
      top: .1em;
      position: absolute;
      transform: translate(-50%, -50%);
      transition: width .2s, height .2s;

      &.is-active {
        height: .8em;
        width: .8em;
        transition: width .1s, height .1s;
      }
    }
  }
</style>
