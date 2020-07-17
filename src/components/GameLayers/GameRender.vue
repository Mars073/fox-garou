<template>
  <div ref="render" class="render"  @mouseup="onMouseUp" @mousemove="onMouseMove">
    <!--<fieldset>
      <legend>Cameras</legend>
      <span v-for="cam in cameras" :key="cam.name">
        <input type="radio" :id="'_' + cam.name" :value="cam.camera" v-model="selectedCamera"/>
        <label :for="'_' + cam.name">{{ cam.name }}</label>
      </span>
      <button @click="playCamera">play</button>
    </fieldset>-->
    <canvas ref="canvas" @mousedown="onMouseDown" @click="onClick"></canvas>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { WEBGL } from 'three/examples/jsm/WebGL'
import { WebGLRenderer, Camera, Vector2, Raycaster, Geometry, MeshBasicMaterial, Group, Vector3 } from 'three'
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer'
import World from '@/world/World'
import Player from '@/world/Player'

@Component
export default class GameRender extends Vue {
  private renderer?: WebGLRenderer
  private cssRenderer?: CSS2DRenderer
  private world: World
  private isRotating = false
  private rotationAngle = 0
  private animateTimer: number
  private selectedCamera: Camera
  private mouse = new Vector2(0, 0)
  private raycaster = new Raycaster()
  private cursorTimeout = 0

  constructor () {
    super()
    console.log('construct')

    this.world = this.$store.getters.world // new World()
    this.animateTimer = 0
    this.selectedCamera = this.world.camera
  }

  get cameras (): object[] {
    return [
      { name: 'dev', camera: this.world.camera } /*,
      ...this.world._players.map((p, i) => ({ name: 'Player_' + i, camera: p.camera })) */
    ]
  }

  get webGLVersion (): string {
    if (WEBGL.isWebGL2Available()) {
      return 'webgl2' // todo: get setting choice
    } else if (WEBGL.isWebGLAvailable()) {
      return 'webgl'
    }
    return '2d' // crash
  }

  get resolutionH (): number {
    return this.$store.state.settings.resolutionH
  }

  get resolutionV (): number {
    return this.$store.state.settings.resolutionV
  }

  get resolutionRatio (): number {
    return this.$store.getters.resolutionRatio
  }

  mounted (): void {
    const canvas = this.$refs.canvas as HTMLCanvasElement
    const context = canvas.getContext(this.webGLVersion, { alpha: false }) as WebGL2RenderingContext
    this.renderer = new WebGLRenderer({ canvas, context, antialias: false })
    this.cssRenderer = new CSS2DRenderer()
    this.cssRenderer.domElement.classList.add('css-renderer')
    this.renderer.setSize(1280, 720)
    this.cssRenderer.setSize(1280, 720)
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.shadowMap.enabled = false
    // this.renderer.shadowMap.type = PCFShadowMap // BasicShadowMap

    // this.$el.appendChild(this.renderer.domElement)
    this.$el.appendChild(this.cssRenderer.domElement)
    this.animateTimer = requestAnimationFrame(this.animate)

    this.playCamera()
  }

  beforeDestroy (): void {
    cancelAnimationFrame(this.animateTimer)
    console.log('destroy')
  }

  onMouseDown (event: MouseEvent) {
    if (this.renderer == null || event.target !== this.renderer.domElement) {
      return
    }
    clearTimeout(this.cursorTimeout)
    this.cursorTimeout = setTimeout(() => {
      this.$el.requestPointerLock()
      this.isRotating = true
    }, 45)
  }

  onMouseUp () {
    clearTimeout(this.cursorTimeout)
    document.exitPointerLock()
    this.isRotating = false
  }

  onMouseMove (event: MouseEvent) {
    const canvas = this.$refs.canvas as HTMLCanvasElement
    this.mouse.x = ((event.clientX - canvas.offsetLeft) / canvas.offsetWidth) * 2 - 1
    this.mouse.y = -((event.clientY - canvas.offsetTop) / canvas.offsetHeight) * 2 + 1

    if (!this.isRotating) { return }

    if (this.selectedCamera === this.world.camera) {
      this.rotationAngle += event.movementX / 100
      this.world.camera.rotation.y = this.rotationAngle
      this.world.camera.position.x = Math.sin(this.rotationAngle) * 10
      this.world.camera.position.z = Math.cos(this.rotationAngle) * 10
    } else {
      const player = (this.selectedCamera.parent as Player)
      if (player.character) {
        player.camera.rotateY(-event.movementX / 50)
        player.character.rotateY(-event.movementX / 50)
      }
    }
  }

  onClick () {
    this.raycaster.setFromCamera(this.mouse, this.selectedCamera)
    const intersects = this.raycaster.intersectObjects(this.world.children, true)
    for (const int of intersects) { // .map(int => int.object)
      if (int.object.userData.player) {
        console.log(int.object)
      }
    }
  }

  playCamera () {
    this.world.camera.points = [
      new Vector3(-3, 3, 52),
      new Vector3(-1.5, 1.2, 46),
      new Vector3(-3, 1.2, 36),
      // new Vector3(-1.5, 1.5, 29),
      new Vector3(1, 0.7, 19),
      // new Vector3(2, 0.7, 15),
      new Vector3(3, 0.7, 14),
      new Vector3(3, 0.7, 9)
    ]

    this.world.camera.play(10, () => {
      this.world.traverse(obj => {
        if (obj.name === 'tribune') {
          this.selectedCamera.add(obj.userData.listener)
          obj.userData.play()
        }
      })
    })
  }

  async animate () {
    if (this.renderer == null || this.cssRenderer == null) { return }

    // todo: refresh size on mount and resize
    const canvas = this.renderer.domElement
    this.cssRenderer.setSize(canvas.offsetWidth, canvas.offsetHeight)
    //
    this.world.traverse(obj => (obj.onBeforeRender)(this.renderer as WebGLRenderer, this.world, this.selectedCamera, new Geometry(), new MeshBasicMaterial(), obj.parent as Group))
    this.renderer.render(this.world, this.selectedCamera)
    this.cssRenderer.render(this.world, this.selectedCamera)
    this.animateTimer = requestAnimationFrame(this.animate)
  }
}
</script>

<style lang="scss" scoped>
  .render {
    display: flex;
    flex-direction: column-reverse;
    position: relative;
  }
  .render canvas {
    width: 100%!important;
    height: auto!important;

    max-width: 100%;
    max-height: 100%;
  }
  .username {
    color: #fff;
    background: #0003;
    padding: 2px 4px;
  }
  .css-renderer {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    pointer-events: none;
  }
</style>
