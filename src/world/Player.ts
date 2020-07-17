import { Group, Mesh, TextureLoader, PerspectiveCamera, CameraHelper, Bone, Euler } from 'three'
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer'
import CacheLoader from './CacheLoader'

export default class Player extends Group {
  private _camera: PerspectiveCamera
  private _character?: Group
  public _bones = {} as { [key: string]: Bone }
  private _label: CSS2DObject

  constructor (name: string, uuid: string) {
    super()
    this.name = 'Player'
    this.userData.name = name
    this.userData.uuid = uuid

    const domElement = document.createElement('DIV')
    domElement.classList.add('username')
    domElement.innerText = name// 'St' + 'e'.repeat(1 + Math.random() * 8) + 've'
    this._label = new CSS2DObject(domElement)
    this._label.position.set(0, 0.82, -2)
    this.add(this._label)

    this._camera = new PerspectiveCamera(45, 1280 / 720, 0.1, 1000)
    this._camera.position.set(0, 0.73, -2)
    this._camera.rotation.y = -Math.PI
    this.add(this._camera)

    const helper = new CameraHelper(this._camera)
    this.add(helper)
    helper.visible = false
    CacheLoader.load('character/characterMedium', true)
      .then(mesh => {
        mesh.scale.setScalar(0.002)
        mesh.position.set(0, 0, -2)
        const texture = new TextureLoader().load('/game/skins/survivorMaleB.png')
        mesh.traverse(child => {
          child.userData.player = this
          if (child instanceof Mesh) {
            child.material.map = texture
            child.material.needsUpdate = true
          } else if (child instanceof Bone) {
            this._bones[child.name] = child
          }
        })
        this.userData.player = this
        this._character = mesh
        this.add(this._character)
        // console.log(this._bones)
      })
  }

  set rotation (euler: Euler) {
    this.rotation.x = euler.x
    this.rotation.y = euler.y
    this.rotation.z = euler.z
  }

  get character () {
    return this._character
  }

  get camera () {
    return this._camera
  }
}
