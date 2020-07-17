import Building from './buildings/Building'
import { Group, Mesh, PlaneBufferGeometry, MeshPhongMaterial } from 'three'
import Entrance from './buildings/Entrance'
import Mill from './buildings/Mill'
import Jail from './buildings/Jail'
import Square from './buildings/Square'
import MayorTribune from './gob/MayorTribune'
import CacheLoader from './CacheLoader'

export default class Terrain extends Group {
  private _buildings = {} as { [key: string]: Building }
  private _decoration: Group
  private _ground: Mesh

  constructor () {
    super()
    this._ground = this.ground
    this._decoration = new Group()

    // building
    this._buildings.entrance = new Entrance(-1.5, 0, 40)
    this._buildings.square = new Square(0, 0.01)
    this._buildings.jail = new Jail(-3, 0, 4.5)
    this._buildings.mill = new Mill(0, 0, -12)

    this._buildings.jail.rotation.y = 1.1
    this._buildings.entrance.rotation.y = -Math.PI / 2 + 0.3

    this.add(...Object.values(this._buildings))

    // décoration
    this._decoration.add(new MayorTribune())
    CacheLoader.load('town/rockWide').then(mesh => {
      mesh.traverseVisible(m => {
        if (m instanceof Mesh) {
          m.material = new MeshPhongMaterial({ color: 0x79939E })
        }
      })
      mesh.position.set(-20, 0, -40)
      mesh.scale.setScalar(20)
      this._decoration.add(mesh)
    })
    CacheLoader.load('town/rockLarge').then(mesh => {
      mesh.traverseVisible(m => {
        if (m instanceof Mesh) {
          m.material = new MeshPhongMaterial({ color: 0x79939E })
        }
      })
      mesh.position.set(-6, 0, -40)
      mesh.scale.setScalar(20)
      this._decoration.add(mesh)
    })
    CacheLoader.load('town/treeHighRound').then(mesh => {
      mesh.position.set(3, 0, 35)
      this._decoration.add(mesh.clone())
      mesh.position.set(4, 0, 34.5)
      mesh.scale.setScalar(1.5)
      this._decoration.add(mesh)
    })
    this.add(this._decoration)
  }

  set ground (ground: Mesh) {
    if (this._ground != null) {
      this.remove(this._ground)
    }
    this._ground = ground
    this.add(this._ground)
  }

  get ground (): Mesh {
    if (this._ground == null) {
      const ground = new Mesh(
        new PlaneBufferGeometry(1000, 1000),
        new MeshPhongMaterial({ color: 0x399776 })
      )
      ground.rotation.x = -Math.PI / 2
      this.ground = ground
    }
    return this._ground
  }
}
