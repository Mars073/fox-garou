import { Scene, Euler } from 'three'
import SkyBox from './SkyBox'
import Player from './Player'
import Terrain from './Terrain'
import PathCamera from './PathCamera'
import CacheLoader from './CacheLoader'
import { BASIC_RESOURCES } from '@/utils/Constant'

export default class World extends Scene {
  private _skyBox?: SkyBox;
  public _camera?: PathCamera;
  private _map: Terrain;
  public _players = {} as { [key: string]: Player }

  constructor () {
    super()
    this.name = 'world'
    // this.fog = new FogExp2(0x76939e, 0.002)

    // basics
    this._map = new Terrain()
    this.add(
      this._map,
      this.camera,
      this.skyBox
    )

    // players
    /* for (let index = 0; index < 12; ++index) {
      const player = new Player()
      player.rotation.y = Math.PI * index / 6
      this._players.push(player)
      this.add(player)
    } */

    // debug
    // this.camera.position.y = 2
    // this.add(new Entrance())
  }

  set skyBox (skyBox: SkyBox) {
    this._skyBox = skyBox
  }

  get skyBox (): SkyBox {
    if (this._skyBox == null) {
      this.skyBox = new SkyBox()
    }
    return this._skyBox as SkyBox
  }

  set camera (camera: PathCamera) {
    this._camera = camera as PathCamera
  }

  get camera (): PathCamera {
    if (this._camera == null) {
      const camera = new PathCamera(35, 1280 / 720, 0.1, 8000)
      camera.position.set(-3, 3, 52)
      camera.rotation.set(-0.06, -0.3, 0)
      this.camera = camera
    }
    return this._camera as PathCamera
  }

  get players (): Player[] {
    return Object.values(this._players)
  }

  addPlayer (name: string, uuid: string, rotation: Euler): void {
    if (!this._players[name]) {
      const player = new Player(name, uuid)
      player.rotation = rotation
      this._players[name] = player
      this.add(player)
    }
  }

  static async loadBasicRessources (): Promise<void> {
    for (const rsc of BASIC_RESOURCES) {
      await CacheLoader.load(rsc)
    }
  }
}
