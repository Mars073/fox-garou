import { Mesh, PlaneGeometry, TextureLoader, MeshBasicMaterial, PositionalAudio, AudioLoader, AudioListener } from 'three'

export default class MayorTribune extends Mesh {
  listener: AudioListener
  sound: PositionalAudio

  constructor () {
    super()
    this.name = 'tribune'
    this.visible = false
    this.geometry = new PlaneGeometry(3, 1.5)
    this.position.set(4, 0.75, 4)
    const loader = new TextureLoader()
    loader.load('/game/debug/mayor.png', texture => {
      this.material = new MeshBasicMaterial({ map: texture, transparent: true })
      this.visible = true
    })
    this.listener = new AudioListener()
    this.sound = new PositionalAudio(this.listener)
    const aLoader = new AudioLoader()
    aLoader.load('/game/sounds/intro.ogg', buffer => {
      this.sound.setBuffer(buffer)
      this.sound.setRefDistance(1)
    })
    this.add(this.sound)
    this.userData.listener = this.listener
    this.userData.play = () => this.sound.play()
  }
}
