import { Group, Object3D } from 'three'

export default class Building extends Group {
  constructor (x = 0, y = 0, z = 0) {
    super()
    this.name = 'building'
    this.position.set(x, y, z)
  }

  addPart (object: Object3D, dx: number, dy: number, dz: number, flipZ = false, flipY = false, flipX = false): this {
    object.position.set(dx, dy, dz)
    if (flipX) {
      object.scale.x *= -1
    }
    if (flipY) {
      object.scale.y *= -1
    }
    if (flipZ) {
      object.scale.z *= -1
    }
    this.add(object)
    return this
  }

  addPartClone (object: Object3D, dx: number, dy: number, dz: number, flipZ = false, flipY = false, flipX = false): this {
    const clone = object.clone()
    return this.addPart(clone, dx, dy, dz, flipZ, flipY, flipX)
  }
}
