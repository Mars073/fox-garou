import { MeshBasicMaterial, BoxGeometry, BackSide, Group, Mesh, AmbientLight, PointLight } from 'three'

export default class SkyBox extends Group {
  private _ambientLight?: AmbientLight;
  private _sunLight?: PointLight;

  constructor () {
    super()
    const geometry = new BoxGeometry(1000, 1000, 1000)
    const material = new MeshBasicMaterial({ color: 0x02baf0, side: BackSide })
    this.add(
      // this.sunLight,
      this.ambientLight,
      new Mesh(geometry, material))
  }

  set ambientLight (light: AmbientLight) {
    this._ambientLight = light
  }

  get ambientLight (): AmbientLight {
    if (this._ambientLight == null) {
      this.ambientLight = new AmbientLight(0xfafafa, 0.8)
    }
    return this._ambientLight as AmbientLight
  }

  set sunLight (light: PointLight) {
    this._sunLight = light
  }

  get sunLight (): PointLight {
    if (this._sunLight == null) {
      this.sunLight = new PointLight(0xffffff, 0.6, 18)
      this.sunLight.position.set(-3, 6, -3)
      /* this.sunLight.castShadow = true
      this.sunLight.shadow.camera.near = 0.1
      this.sunLight.shadow.camera.far = 25 */
    }
    return this._sunLight as PointLight
  }
}
