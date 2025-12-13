("use strict");

import { Vec } from "../math/Maths.js";

export class CollisionInfo {
  constructor() {
    this.depth = 0;
    this.normal = new Vec(0);
    this.start = new Vec(0);
    this.end = new Vec(0);
  }
  getDepth() {
    return this.depth;
  }
  getNormal() {
    return this.normal;
  }
  setNormal(n) {
    this.normal = n;
  }
  changeDir() {
    this.normal = this.normal.scale(-1);
    [this.start, this.end] = [this.end, this.start];
  }
  setCollisionInfo(d, n, s) {
    this.depth = d;
    this.normal = n;
    this.start = s;
    this.end = s.add(n.scale(d));
  }
}

export class CollisionChecker {
  constructor() {
    this.collisionArr = [];
  }
  update(f = c > {}) {
    this.update = f;
  }
  collisions() {}
}
