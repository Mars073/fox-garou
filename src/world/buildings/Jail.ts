import Building from './Building'
import CacheLoader from '../CacheLoader'
import { Mesh, BoxBufferGeometry, MeshPhongMaterial } from 'three'

export default class Jail extends Building {
  constructor (x = 0, y = 0, z = 0) {
    super(x, y, z)
    CacheLoader.load('town/wallDoorwaySquareWideCurved').then(mesh => {
      this.addPart(mesh, 0, 0, -0.5)
      this.addPartClone(mesh, 0, 0, 0.5, true)
    })
    CacheLoader.load('town/stallStool').then(mesh => {
      this.addPart(mesh, 0, 0, -0.5)
    })
    CacheLoader.load('town/overhang').then(mesh => {
      mesh.rotation.y = -Math.PI
      this.addPart(mesh, 0, -0.2, 0.4)
    })
    CacheLoader.load('town/wall').then(mesh => {
      mesh.rotation.y = -Math.PI
      this.addPart(mesh, 0, 0, -0.5)
      this.addPartClone(mesh, 0, 0, 0.5)
    })
    CacheLoader.load('town/wallDetailCross').then(mesh => {
      mesh.rotation.y = -Math.PI / 2
      this.addPart(mesh, 0, 0, 0.5)
      this.addPartClone(mesh, 0, 0, -1.4)
    })
    CacheLoader.load('town/roofHighGableTop').then(mesh => {
      mesh.rotation.y = Math.PI / 2
      this.addPart(mesh, 0, 1, 0.5)
      this.addPartClone(mesh, 0, 1, -0.5)
    })
    const bar = new Mesh(new BoxBufferGeometry(0.04, 0.9, 0.04), new MeshPhongMaterial({ color: 0x809CA8 }))
    this.addPart(bar, 0.45, 0.45, 0)
    this.addPartClone(bar, 0.45, 0.45, 0.6)
    this.addPartClone(bar, 0.45, 0.45, 0.4)
    this.addPartClone(bar, 0.45, 0.45, 0.2)
    this.addPartClone(bar, 0.45, 0.45, -0.2)
    this.addPartClone(bar, 0.45, 0.45, -0.4)
    this.addPartClone(bar, 0.45, 0.45, -0.6)
  }
}
