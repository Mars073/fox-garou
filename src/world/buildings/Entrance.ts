import CacheLoader from '../CacheLoader'
import Building from './Building'

export default class Entrance extends Building {
  // private mesh_arch: Group

  constructor (x = 0, y = 0, z = 0) {
    super(x, y, z)
    CacheLoader.load('town/wallDetailHorizontal').then(mesh => {
      this.addPart(mesh, 0, 0, -1)
      this.addPartClone(mesh, 0, 0, 2)
    })
    CacheLoader.load('town/wallArchTopDetail').then(mesh => {
      this.addPart(mesh, 0, 1, 1)
      this.addPartClone(mesh, 0, 1, 0, true)
    })
    CacheLoader.load('town/wallArch').then(mesh => {
      this.addPart(mesh, 0, 0, 1)
      this.addPartClone(mesh, 0, 0, 0, true)
    })
    CacheLoader.load('town/wallWindowStone').then(mesh => {
      this.addPart(mesh, 0, 1, -1)
      this.addPartClone(mesh, 0, 1, 2)
    })
    CacheLoader.load('town/wallWoodWindowStone').then(mesh => {
      this.addPart(mesh, 0, 2, 1)
      this.addPartClone(mesh, 0, 2, 0)
    })
    CacheLoader.load('town/wallWoodDetailHorizontal').then(mesh => {
      this.addPart(mesh, 0, 3, 1)
      this.addPartClone(mesh, 0, 3, 0)
    })
    CacheLoader.load('town/roofHighRight').then(mesh => {
      mesh.rotateY(Math.PI / 2)
      this.addPart(mesh, 0, 2, 2)
      this.addPartClone(mesh, -3, 2, 2, true)
      this.addPartClone(mesh, 0, 2, -1, false, false, true)
      this.addPartClone(mesh, -3, 2, -1, true, false, true)

      this.addPartClone(mesh, 0, 4, 1)
      this.addPartClone(mesh, 0, 4, 0, false, false, true)
      this.addPartClone(mesh, -3, 4, 1, true)
      this.addPartClone(mesh, -3, 4, 0, true, false, true)
    })
    CacheLoader.load('town/roofHigh').then(mesh => {
      mesh.rotateY(Math.PI / 2)
      mesh.scale.z = 2.4
      this.addPart(mesh, -1.5, 2, 2)
      this.addPartClone(mesh, -1.5, 4, 1)
      this.addPartClone(mesh, -1.5, 4, 0, false, false, true)
      this.addPartClone(mesh, -1.5, 2, -1, false, false, true)
    })
    CacheLoader.load('town/bannerGreen').then(mesh => {
      this.addPart(mesh, 0.16, 3, 0.5)
    })
    CacheLoader.load('town/wall').then(mesh => {
      mesh.rotateY(-Math.PI / 2)
      const wall = new Building()
      wall.addPart(mesh, 0, 0, -1)
      wall.addPartClone(mesh, -1, 0, -1)
      wall.addPartClone(mesh, -2, 0, -1)
      wall.addPartClone(mesh, -3, 0, -1)
      wall.addPartClone(mesh, 0, 1, -1)
      wall.addPartClone(mesh, -1, 1, -1)
      wall.addPartClone(mesh, -2, 1, -1)
      wall.addPartClone(mesh, -3, 1, -1)
      this.add(wall)
      this.addPartClone(wall, 0, 0, -1)
      this.addPartClone(wall, -3, 0, 2, false, false, true)
      this.addPartClone(wall, -3, 0, 3, false, false, true)
    })
    CacheLoader.load('town/wallWood').then(mesh => {
      mesh.rotateY(-Math.PI / 2)
      const wall = new Building()
      wall.addPart(mesh, 0, 3, 1)
      wall.addPartClone(mesh, -1, 3, 1)
      wall.addPartClone(mesh, -2, 3, 1)
      wall.addPartClone(mesh, -3, 3, 1)
      this.add(wall)
      this.addPartClone(wall, -3, 0, 1, true, false, true)
    })
    CacheLoader.load('town/fence').then(mesh => {
      this.addPart(mesh, 0, 0, 3)
      this.addPartClone(mesh, 0, 0, 4)
      this.addPartClone(mesh, 0, 0, -3)
      const mesh2 = mesh.clone()
      mesh2.rotation.y = 0.3
      this.addPart(mesh2, -0.1, 0, -3.8)
      const mesh3 = mesh.clone()
      mesh3.rotation.y = 0.5
      this.addPart(mesh3, -0.4, 0, -4.6)
    })
    CacheLoader.load('town/fenceBroken').then(mesh => {
      this.addPart(mesh, 0, 0, -2)
    })
  }
}
