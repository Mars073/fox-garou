<template>
  <div class="select" tabindex="0" @blur="closeList" @keydown="onKeydown">
    <template @click="showList = true">
      <label v-if="selected" @click="showList = !showList">{{ selected[0] }}</label>
      <label v-else class="placeholder">{{ placeholder }}</label>
    </template>
    <button class="u" @click="previous">
      <span class="icon"></span>
    </button>
    <button class="d" @click="next">
      <span class="icon"></span>
    </button>
    <div v-if="showList" class="list">
      <option v-for="el in list" :key="el[0]" :value="el[1]" @click="$emit('change', el[1]); closeList()" :class="{ 'is-active': equals(el[1], value) }">{{ el[0] }}</option>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Model, Prop } from 'vue-property-decorator'

@Component
export default class FgSelect extends Vue {
  @Model('change') readonly value: unknown | undefined
  @Prop() readonly options!: { [key: string]: unknown }
  @Prop({ default: 'Selectionnez' }) readonly placeholder!: string
  @Prop({ required: true }) readonly equals!: (a: unknown, b: unknown) => boolean // { default: (a: unknown, b: unknown) => a === b }
  private showList = false

  get list (): [string, unknown][] {
    return Object.entries(this.options)
  }

  get selectedIndex (): number {
    // this.list.forEach(el => console.log(el[1], this.value))
    return this.list.findIndex(el => this.equals(el[1], this.value))
  }

  get selected (): unknown {
    return this.selectedIndex < 0 ? undefined : this.list[this.selectedIndex] // .find(el => this.equals(el[1], this.value))
  }

  closeList () {
    this.showList = false
  }

  move (d: number) {
    if (this.list.length > 1) {
      const index = this.selectedIndex + d
      if (index < 0) {
        this.$emit('change', this.list[this.list.length - 1][1])
      } else if (index >= this.list.length) {
        this.$emit('change', this.list[0][1])
      } else {
        this.$emit('change', this.list[index][1])
      }
    }
  }

  previous () {
    this.move(-1)
  }

  next () {
    this.move(+1)
  }

  onKeydown (event: KeyboardEvent) {
    if (event.keyCode === 40) {
      this.next()
    } else if (event.keyCode === 38) {
      this.previous()
    }
  }
}
</script>

<style lang="scss" scoped>
  .select {
    background: #282d31;
    border: .1em solid #282d31;
    border-radius: 0.4em 0.3em 0.3em 0.4em;
    display: grid;
    grid-template-areas: "l u" "l d";
    grid-template-columns: auto 1em;
    position: relative;

    label {
      background: #fff;
      color: #222;
      border-radius: 0.4em 0.4em 0.6em 0.4em;
      box-shadow: inset .1em .2em 0 0 #bbb, inset 0 0.2em 0 0 #bbb, 0 0 0 .1em #282d31;
      text-shadow: none;
      margin-right: 0em;
      padding: 0 .8em 0 .8em;
      grid-area: l;
      z-index: 100;

      &.placeholder {
        color: #bbb;
      }
    }

    button {
      background: #31a8ff;
      border: none;
      box-shadow: -1.5em 0 0 0 #0003, -1.5em 0 0 0 #31a8ff;
      padding: 0;
      min-height: auto;
      min-width: auto;
      font-size: .4em;

      &:active {
        opacity: .85;
      }
      &::after {
        display: none;
      }
      &.u {
        grid-area: u;
      }
      &.d {
        grid-area: d;
      }
    }

    .list {
      background: #fff;
      border: .1em solid #282d31;
      border-top: none;
      border-radius: 0 0 .4em .4em;
      box-shadow: inset .1em 0 0 0 #bbb;
      color: #222;
      text-shadow: none;
      position: absolute;
      max-height: 10em;
      overflow-y: auto;
      top: calc(100%/1 - .4em/1);
      left: -.1em;
      right: .9em;
      padding: .4em 0;
      z-index: 1001;

      option {
        padding: 0 .4em;

        &:hover {
          background: #bbb;
        }
        &.is-active {
          display: none;
        }
      }
    }
  }
</style>
