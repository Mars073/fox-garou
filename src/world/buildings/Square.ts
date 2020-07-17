import Building from './Building'
import CacheLoader from '../CacheLoader'
import { CircleGeometry, Mesh, MeshPhongMaterial } from 'three'

export default class Square extends Building {
  constructor (x = 0, y = 0, z = 0) {
    super(x, y, z)
    const square = new Mesh(new CircleGeometry(6), new MeshPhongMaterial({ color: 0x809CA8 }))
    square.rotateX(-Math.PI / 2)
    this.add(square)
    CacheLoader.load('town/fountainRound').then(mesh => {
      this.addPart(mesh, 0, 0, 0)
    })
    CacheLoader.load('town/roadBend').then(mesh => {
      this.addPart(mesh, -1.5, 0, 1.5)
      this.addPartClone(mesh, 1.5, 0, -1.5, true, false, true)
      this.addPartClone(mesh, 1.5, 0, 1.5, false, false, true)
      this.addPartClone(mesh, -1.5, 0, -1.5, true)
    })
    CacheLoader.load('town/stallBench').then(mesh => {
      mesh.rotation.y = 0.10
      this.addPart(mesh, -4, 0, -1)
      this.addPartClone(mesh, -4, 0, 1)
    })
    CacheLoader.load('town/cartHigh').then(mesh => {
      mesh.rotation.y = 0.60
      this.addPart(mesh, 3.5, 0, -3)
    })
    CacheLoader.load('town/stallGreen').then(mesh => {
      mesh.rotation.y = 0.30
      this.addPart(mesh, 4, 0, -1.5)
    })
    CacheLoader.load('town/stallRed').then(mesh => {
      mesh.rotation.y = -0.10
      this.addPart(mesh, 4.4, 0, 0)
    })
  }
}
