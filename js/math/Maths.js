("use strict");

export class Linear {
  static convert(value, newValue, oldValue) {
    return (value * newValue) / oldValue;
  }
  static lerp(s, e, t) {
    return s + (e - s) * t;
  }
  static gcd(n, m) {
    const r = n % m;
    if (r === 0) return m;
    return Maths.gcd(m, r);
  }
  static ease = {
    normalizedTime: (currentTime, totalTime) => currentTime / totalTime,

    smoothstep: (x) => x * x * (3 - 2 * x),
    linear: (x) => x,
    acceleration: (x, exp = 2) => Math.pow(x, exp),
    deceleration: (x, exp = 2) => 1 - Math.pow(1 - x, exp),
    sine: (x) => Math.sin((x * Math.PI) / 2),
    inverseSine: (x) => 1 - Math.sin(((1 - x) * Math.PI) / 2),
    sineComplete: (x) => 0.5 - Math.cos(-x * Math.PI) * 0.5,
    spline: (t, a, b, c, d) => {
      return (
        0.5 *
        (2 * b +
          (-a + c) * t +
          (2 * a - 5 * b + 4 * c - d) * t * t +
          (-a + 3 * b - 3 * c + d) * t * t * t)
      );
    },
    weightedAverage: (p, d, w) => (p * (w - 1) + d) / w,
    cubicBezier: (t, a, b, c, d) => {
      var t2 = t * t;
      var t3 = t2 * t;
      return (
        a +
        (-a * 3 + t * (3 * a - a * t)) * t +
        (3 * b + t * (-6 * b + b * 3 * t)) * t +
        (c * 3 - c * 3 * t) * t2 +
        d * t3
      );
    },
  };
}

export class Vec {
  static distance(v, u) {
    return u.sub(v).mag;
  }
  static angle(v, u) {
    return u.sub(v).dir;
  }
  static polar(dir, mag) {
    return new Vec(Math.cos(dir) * mag, Math.sin(dir) * mag, this.z);
  }
  static lerp(s, e, t) {
    return s.add(e.sub(s).scale(t));
  }
  static intersectionTime(a, b, c, d) {
    let ab, dc, ac, det, con, s, t;
    ab = b.sub(a);
    dc = c.sub(d);
    ac = c.sub(a);
    det = ab.y * dc.x - ab.x - dc.y;
    if (det === 0) return null;
    con = ab.y * ac.x - ab.x * ac.y;
    s = con / det;
    if (s < 0 || s > 1) return null;
    if (ab.x !== 0) {
      t = ac.x - s * dc.x;
      t = t / ab.x;
    } else {
      t = ac.y - s * dc.y;
      t = t / ab.y;
    }
    if (t >= 0 && t <= 1) return t;
    return null;
  }
  constructor(x, y = x, z = 0) {
    this.set(x, y, z);
  }
  set(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  }
  get mag() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }
  get dir() {
    return Math.atan2(this.y, this.x);
  }
  get lNormal() {
    return new Vec(-this.y, this.x, this.z).normalize();
  }
  get rNormal() {
    return new Vec(this.y, -this.x, this.z).normalize();
  }
  dot(v) {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }
  cross2d(v) {
    return this.x * v.y - this.y * v.x;
  }
  cross(v) {
    return new Vec(
      this.y * v.z - this.z * v.y,
      this.z * v.x - this.x * v.z,
      this.x * v.y - this.y * v.x
    );
  }
  add(v) {
    return new Vec(this.x + v.x, this.y + v.y, this.z + v.z);
  }
  add2(x, y, z = 0) {
    return new Vec(this.x + x, this.y + y, this.z + z);
  }
  sub(v) {
    return new Vec(this.x - v.x, this.y - v.y, this.z - v.z);
  }
  sub2(x, y, z = 0) {
    return new Vec(this.x - x, this.y - y, this.z - z);
  }
  scale(s) {
    return new Vec(this.x * s, this.y * s, this.z * s);
  }
  scale2(x, y, z = 0) {
    return new Vec(this.x * x, this.y * y, this.z * z);
  }
  normalize() {
    let len = this.mag;
    if (len > 0) len = 1 / len;
    return new Vec(this.x, this.y, this.z).scale(len);
  }
  rotate(c, a) {
    let x, y, r, cos, sin;
    x = this.x - c.x;
    y = this.y - c.y;
    cos = Math.cos(a);
    sin = Math.sin(a);
    r = new Vec(x * cos - y * sin, x * sin + y * cos, this.z);
    return c.add(r);
  }
}
