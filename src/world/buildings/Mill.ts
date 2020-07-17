import Building from './Building'
import CacheLoader from '../CacheLoader'
import { Mesh, MeshBasicMaterial, PlaneGeometry } from 'three'

export default class Mill extends Building {
  constructor (x = 0, y = 0, z = 0) {
    super(x, y, z)
    CacheLoader.load('town/wallDetailCross').then(mesh => {
      this.addPart(mesh, 2, 0, 0)
    })
    CacheLoader.load('town/wall').then(mesh => {
      mesh.rotation.y = -Math.PI / 2
      this.addPart(mesh, 0, 0, 1)
    })
    CacheLoader.load('town/wallDoorwayRound').then(mesh => {
      mesh.rotation.y = -Math.PI / 2
      this.addPart(mesh, 0, 1, 1)
    })
    CacheLoader.load('town/wallDiagonal').then(mesh => {
      this.addPart(mesh, 1, 0, 1)
      this.addPartClone(mesh, 1, 1, 1)
      this.addPartClone(mesh, -1, 0, 1, true)
      this.addPartClone(mesh, -1, 1, 1, true)
    })
    CacheLoader.load('town/wallWood').then(mesh => {
      mesh.rotation.y = -Math.PI / 2
      this.addPart(mesh, 0, 2, 1)
    })
    CacheLoader.load('town/wallWoodDoor').then(mesh => {
      mesh.rotation.y = -Math.PI / 2
      this.addPart(mesh, 0, 3, 1)
    })
    CacheLoader.load('town/wallWoodDiagonal').then(mesh => {
      this.addPart(mesh, 1, 2, 1)
      this.addPartClone(mesh, 1, 3, 1)
      this.addPartClone(mesh, -1, 2, 1, true)
      this.addPartClone(mesh, -1, 3, 1, true)
    })
    CacheLoader.load('town/wallWindowStone').then(mesh => {
      mesh.rotation.y = -Math.PI / 2
      this.addPart(mesh, 2, 0, 0)
    })
    CacheLoader.load('town/roofHighGableDetail').then(mesh => {
      this.addPart(mesh, 2, 1, 0, true)
    })
    CacheLoader.load('town/planks').then(mesh => {
      this.addPart(mesh, 1, 1, 1)
      this.addPartClone(mesh, 0, 1, 1)
      this.addPartClone(mesh, -1, 1, 1)
    })
    CacheLoader.load('town/planksHalf').then(mesh => {
      mesh.rotation.y = Math.PI / 2
      this.addPart(mesh, 1, 1, 2)
      this.addPartClone(mesh, 0, 1, 2)
      this.addPartClone(mesh, -1, 1, 2)
    })
    CacheLoader.load('town/pillarWood').then(mesh => {
      mesh.rotation.y = Math.PI / 2
      this.addPart(mesh, 1.5, 0, 2)
      this.addPartClone(mesh, -1.5, 0, 2)
    })
    CacheLoader.load('town/fence').then(mesh => {
      mesh.rotation.y = Math.PI / 2
      this.addPart(mesh, 1, 1, 2.5)
      this.addPartClone(mesh, 0, 1, 2.5)
      this.addPartClone(mesh, -1, 1, 2.5)
    })
    CacheLoader.load('town/stairsWood').then(mesh => {
      mesh.rotation.y = Math.PI / 2
      this.addPart(mesh, -1.75, 0, 1.25)
    })
    CacheLoader.load('town/roofHighCornerRound').then(mesh => {
      mesh.scale.set(1.5, 1, 1.5)
      this.addPart(mesh, -0.75, 4, 0.75)
      this.addPartClone(mesh, -0.75, 4, -0.75, true)
      this.addPartClone(mesh, 0.75, 4, 0.75, false, false, true)
      this.addPartClone(mesh, 0.75, 4, -0.75, true, false, true)
    })
    CacheLoader.load('town/windmill').then(mesh => {
      mesh.rotation.y = Math.PI / 2
      this.addPart(mesh, 0, 3.5, 1.65)

      mesh.onBeforeRender = () => {
        mesh.rotateX(-0.002)
      }
    })
    CacheLoader.load('town/rockSmall').then(mesh => {
      this.addPart(mesh, 0, 0, 2)
    })
    const hider = new Mesh(new PlaneGeometry(2.5, 4), new MeshBasicMaterial({ color: 0x0 }))
    hider.position.y = 2
    this.add(hider)
  }
}
