import { PerspectiveCamera, Vector3, Clock, Object3D, Euler } from 'three'

interface RelativeVector3 extends Vector3 {
  position: number; // 0 .. 1
  size: number; // 0 .. 1
  distance: number;
  angle: Euler;
  distanceAt: number;
}

export default class PathCamera extends PerspectiveCamera {
  public _points = [] as RelativeVector3[]
  private clock: Clock
  private seconds = 1
  private _distance = -1
  private callback: () => void

  constructor (fov?: number, aspect?: number, near?: number, far?: number, autoplay = false) {
    super(fov, aspect, near, far)
    this.clock = new Clock(autoplay)
    this.callback = () => null
    this.onBeforeRender = () => this.animate()
  }

  set points (points: Vector3[]) {
    this.stop()
    this._distance = -1
    this._points = points.map(p => {
      // eslint-disable-next-line
      const rp = p as any
      rp.size = 0
      rp.distance = 0
      rp.angle = new Euler()
      rp.distanceAt = 0
      rp.position = 0
      return rp as RelativeVector3
    }) // as RelativeVector3[]
    const length = this.distance
    let progress = 0
    this._points.map(p => {
      p.size = p.distance / length
      progress += p.size
      p.position = progress
    })
    if (this._points.length > 0) {
      this._points[0].angle = this.rotation
    }
  }

  get points () {
    return this._points
  }

  get distance (): number {
    if (this._distance > 0) { return this._distance }
    let distance = 0
    for (let i = 1; i < this._points.length; ++i) {
      const dist = this._points[i - 1].distanceTo(this._points[i])
      this._points[i].distanceAt = distance
      distance += dist
      this._points[i].distance = dist
      const tmp = new Object3D()
      tmp.position.set(this._points[i].x, this._points[i].y, this._points[i].z)
      tmp.lookAt(this._points[i - 1])
      this._points[i].angle = tmp.rotation
    }
    this._distance = distance
    return distance
  }

  get progress (): number {
    return Math.max(0, Math.min(1, this.clock.getElapsedTime() / this.seconds))
  }

  private animate () {
    if (!this.clock.running) { return }
    const position = Math.max(0, Math.min(1, this.clock.getElapsedTime() / this.seconds))
    if (position >= 1) {
      this.stop();
      (this.callback)()
      return
    }
    const progress = this.progress
    for (let i = 0; i < this._points.length - 1; ++i) {
      const o = this._points[i]
      const d = this._points[i + 1]
      if (o.position < progress && d.position >= progress) {
        const ratio = (progress - o.position) / (d.position - o.position)
        this.position.set(
          o.x + (d.x - o.x) * ratio,
          o.y + (d.y - o.y) * ratio,
          o.z + (d.z - o.z) * ratio
        )
        this.rotation.set(
          o.angle.x + (d.angle.x - o.angle.x) * ratio,
          o.angle.y + (d.angle.y - o.angle.y) * ratio,
          o.angle.z + (d.angle.z - o.angle.z) * ratio
        )
        break
      }
    }
  }

  get isPlaying () {
    return this.clock.running
  }

  play (seconds = 1, callback?: () => void) {
    this.stop()
    this.seconds = seconds
    if (callback) {
      this.callback = callback
    }
    this.clock.start()
  }

  stop () {
    this.clock.stop()
  }
}
