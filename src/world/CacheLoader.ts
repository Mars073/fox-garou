import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { Group, Mesh } from 'three'

export default class CacheLoader {
  public static readonly path = '/game/world/models/'
  public static cache = {} as { [key: string]: Group }

  static load (name: string, fbx = false): Promise<Group> {
    return new Promise<Group>((resolve) => {
      if (CacheLoader.cache[name]) {
        resolve(CacheLoader.cache[name].clone())
        return
      }
      if (fbx) {
        const fbx = new FBXLoader()
        fbx.setPath(CacheLoader.path)
        fbx.load(name + '.fbx', mesh => {
          // CacheLoader.cache[name] = mesh
          mesh.traverse(child => {
            if (child instanceof Mesh) {
            }
          })
          resolve(mesh) // .clone()
        })
      } else {
        const mtlLoader = new MTLLoader()
        mtlLoader.setPath(CacheLoader.path)
        mtlLoader.load(name + '.mtl', materials => {
          materials.preload()

          const objLoader = new OBJLoader()
          objLoader.setMaterials(materials)
          objLoader.setPath(CacheLoader.path)
          objLoader.load(name + '.obj', mesh => {
            CacheLoader.cache[name] = mesh
            mesh.traverse(child => {
              if (child instanceof Mesh) {
              }
            })
            resolve(mesh.clone())
          })
        })
      }
    })
  }
}
