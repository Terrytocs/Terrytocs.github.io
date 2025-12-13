("use strict");

import Draw from "./Draw.js";

export const collisionArr = [];

class Sprite {
  static remove(...spritesToRemove) {
    spritesToRemove.forEach((sprite) => {
      sprite.parent.removeChild(sprite);
    });
  }
  constructor(pos, config = {}) {
    this.pos = pos;
    this.config = config;

    this.type = this.constructor.name.toLowerCase();

    this._rotation = 0;
    this._scale = [1, 1];
    this._layer = 0;
    this._currentFrame = 0;
    this.frames = [];
    this.children = [];
    this.parent = undefined;
    this.shadow = false;
    this.shadowColor = "rgba(100, 100, 100, 0.5)";
    this.shadowOffsetX = 3;
    this.shadowOffsetY = 3;
    this.shadowBlur = 3;
    this.loop = true;
    this.playing = false;
    this._draggable = undefined;
    this.canCollide = false;
    this.isVisible = true;
  }

  boundTest(a, b) {
    if (!this.canCollide) return false;
    const radSum = a.boundRadius + b.boundRadius;
    const dist = a.pos.sub(b.pos).mag;
    if (dist > radSum) return false;
    return true;
  }
  get layer() {
    return this._layer;
  }
  set layer(value) {
    this._layer = value;
    if (this.parent) {
      this.parent.children.sort((a, b) => a.layer - b.layer);
    }
  }
  addChild(sprite) {
    if (sprite.parent) {
      sprite.parent.removeChild(sprite);
    }
    sprite.parent = this;
    sprite.pos = this.pos.add(sprite.pos);
    this.children.push(sprite);
  }
  removeChild(sprite) {
    if (sprite.parent === this) {
      this.children.splice(this.children.indexOf(sprite), 1);
    } else {
      throw new Error(sprite + "is not a child of " + this);
    }
  }
  add(...spritesToAdd) {
    spritesToAdd.forEach((sprite) => this.addChild(sprite));
  }
  remove(...spritesToRemove) {
    spritesToRemove.forEach((sprite) => this.removeChild(sprite));
  }
  drawChildren(ctx) {
    for (let child of this.children) {
      if (child.isVisible) child.draw(ctx);
    }
  }
  updateChildren(t) {
    for (let child of this.children) child.update(t);
  }
  swapChildren(child1, child2) {
    let index1 = this.children.indexOf(child1),
      index2 = this.children.indexOf(child2);
    if (index1 !== -1 && index2 !== -1) {
      child1.childIndex = index2;
      child2.childIndex = index1;
      this.children[index1] = child2;
      this.children[index2] = child1;
    } else {
      throw new Error(`Both objects must be a child of the caller ${this}`);
    }
  }
  get empty() {
    if (this.children.length === 0) {
      return true;
    } else {
      return false;
    }
  }
  get currentFrame() {
    return this._currentFrame;
  }

  translate(v) {
    if (this.children.length > 0) {
      for (let child of this.children) {
        child.translate(v);
      }
    }
    this.pos = this.pos.add(v);
  }
  truck(v, focus) {
    if (this.children.length > 0) {
      for (let child of this.children) {
        child.translate(v.scale(-1));
      }
    }
    if (focus) focus.pos = focus.pos.add(v);
  }
  update(f = (t) => {}) {
    if (typeof f === "function") this.update = f;
    else
      this.update = () => {
        return;
      };
  }
}

class Camera extends Sprite {
  constructor(pos, config) {
    super(pos, config);
  }
}

export class Scene extends Sprite {
  constructor(pos, props = {}, config) {
    super(pos, config);
    Object.assign(this, props);
    this.camera = new Camera(pos, config);
    this.add(this.camera);
  }
}

export class Layer extends Sprite {
  constructor(pos, config) {
    super(pos, config);
  }
}

export class Rectangle extends Sprite {
  #_getVertices(pos, size, rotation) {
    return [
      pos.add(size.scale(-0.5)).rotate(pos, rotation),
      pos.add(size.scale2(0.5, -0.5)).rotate(pos, rotation),
      pos.add(size.scale(0.5)).rotate(pos, rotation),
      pos.add(size.scale2(-0.5, 0.5)).rotate(pos, rotation),
    ];
  }
  #_getFaces(pos, vertices) {
    return [
      pos.add(vertices[0].sub(vertices[3]).scale(0.5)),
      pos.add(vertices[1].sub(vertices[0]).scale(0.5)),
      pos.add(vertices[2].sub(vertices[1]).scale(0.5)),
      pos.add(vertices[3].sub(vertices[2]).scale(0.5)),
    ];
  }
  #_getFaceNormals(faces) {
    return [
      faces[0].normalize(),
      faces[1].normalize(),
      faces[2].normalize(),
      faces[3].normalize(),
    ];
  }
  constructor(pos, props, config) {
    super(pos, config);
    this.props = props;
    this.size = props.size;

    this.boundRadius =
      Math.sqrt(this.size.x * this.size.x + this.size.y * this.size.y) / 2;

    this._vertices = this.#_getVertices(this.pos, this.size, this._rotation);
    this._faces = this.#_getFaces(this.pos, this._vertices);
    this._faceNormals = this.#_getFaceNormals(this._faces);
  }
  contains(pos) {
    return (
      pos.y >= this._faces[0].y &&
      pos.x <= this._faces[1].x &&
      pos.y <= this._faces[2].y &&
      pos.x >= this._faces[3].x
    );
  }
  get vertices() {
    return this._vertices;
  }
  get faces() {
    return this._faces;
  }
  get faceNormals() {
    return this._faceNormals;
  }
  translate(v) {
    if (this.children.length > 0) {
      for (let child of this.children) {
        child.translate(v);
      }
    }
    this.pos = this.pos.add(v);
    this._vertices = this.#_getVertices(this.pos, this.size, this._rotation);
    this._faces = this.#_getFaces(this.pos, this._vertices);
    this._faceNormals = this.#_getFaceNormals(this._faces);
  }
  rotate(a) {
    this._rotation += a;
    if (this.children.length > 0) {
      for (let child of this.children) {
        child.rotate(a);
      }
    }
    this._vertices = this.#_getVertices(this.pos, this.size, this._rotation);
    this._faces = this.#_getFaces(this.pos, this._vertices);
    this._faceNormals = this.#_getFaceNormals(this._faces);
  }
  scale(s) {
    this._scale = [s, s];
    if (this.children.length > 0) {
      for (let child of this.children) {
        child.scale(s);
      }
    }
    this.size.scale(s);
    this._vertices = this.#_getVertices(this.pos, this.size, this._rotation);
    this._faces = this.#_getFaces(this.pos, this._vertices);
    this._faceNormals = this.#_getFaceNormals(this._faces);
  }
  scale2(s1, s2) {
    this._scale = [s1, s2];
    if (this.children.length > 0) {
      for (let child of this.children) {
        child.scale2(s1, s2);
      }
    }
    this.size.scale2(s1, s2);
    this._vertices = this.#_getVertices(this.pos, this.size, this._rotation);
    this._faces = this.#_getFaces(this.pos, this._vertices);
    this._faceNormals = this.#_getFaceNormals(this._faces);
  }
  draw(ctx) {
    new Draw(ctx, "rect", this.size.scale(-0.5), this.props, {
      display: {
        translate: [this.pos.x, this.pos.y],
        rotate: this._rotation,
        ...this.config.display,
      },
      props: {
        ...this.config.props,
      },
    });
  }

  //COLLISIONS
  collisionTest(a, b, collisionInfo) {
    let status;
    if (b.type === "circle") status = null;
    if (b.type === "rectangle")
      status = this.collisionRectRect(a, b, collisionInfo);
    return status;
  }

  //RECT RECT
  collisionRectRect(r1, r2, collisionInfo) {}
  findAxisLeastPenetration(otherRect, collisionInfo) {
    let n,
      normal,
      vertex,
      tmpSupport,
      supportPoint,
      bestDistance = 9999999,
      bestIndex = null,
      hasSupport = true,
      i = 0;
    while (hasSupport && i < this._faceNormals.length) {
      n = this._faceNormals[i];
      normal = n.scale(-1);
      vertex = this._vertices[i];
      tmpSupport = otherRect.findSupportPoint(vertex, normal);
      hasSupport = tmpSupport.supportPoint !== null;
      if (hasSupport && tmpSupport.supportPointDist < bestDistance) {
        bestDistance = tmpSupport.supportPointDist;
        bestIndex = i;
        supportPoint = tmpSupport.supportPoint;
      }
      ++i;
    }
    if (hasSupport) {
      let bestVec = this._faceNormals[bestIndex].scale(bestDistance);
      collisionInfo.setInfo(
        bestDistance,
        this._faceNormals[bestIndex],
        supportPoint.add(bestVec)
      );
    }
    return hasSupport;
  }
  findSupportPoint(vertex, normal) {
    const tmpSupport = {
      supportPointDist: -9999999,
      supportPoint: null,
    };
    let vToVert;
    let dist;
    for (let i = 0; i < this._vertices.length; ++i) {
      vToVert = this._vertices[i].sub(vertex);
      dist = vToVert.dot(normal);
      if (dist > 0 && dist > tmpSupport.supportPointDist) {
        tmpSupport.supportPoint = this._vertices[i];
        tmpSupport.supportPointDist = dist;
      }
    }
    return tmpSupport;
  }

  //RECT ARC
  collisionRectArc() {}
}

export class Circle extends Sprite {
  #_getFaces(pos, size) {
    return [
      pos.add(size.scale2(0, -1)),
      pos.add(size.scale2(1, 0)),
      pos.add(size.scale2(0, 1)),
      pos.add(size.scale2(-1, 0)),
    ];
  }
  constructor(pos, props, config) {
    super(pos, config);
    this.props = props;
    this.size = props.size;
    this._faces = this.#_getFaces(this.pos, this.size);

    this.boundRadius = this.size.x;
  }
  get faces() {
    return this.#_getFaces(this.pos, this.size);
  }
  draw(ctx) {
    new Draw(ctx, "arc", this.pos, this.props, {
      display: {
        ...this.config.display,
      },
      props: {
        ...this.config.props,
      },
    });
  }
}

export class Line extends Sprite {
  constructor(pos, props, config) {
    super(pos, config);
    this.props = props;
  }
  draw(ctx) {
    new Draw(ctx, "line", this.pos, this.props, {
      display: {
        ...this.config.display,
      },
      props: {
        ...this.config.props,
      },
    });
  }
}

export class Text extends Sprite {
  constructor(pos, props, config) {
    super(pos, config);
    this.props = props;
  }
  draw(ctx) {
    new Draw(ctx, "text", this.pos, this.props, {
      display: {
        ...this.config.display,
      },
      props: {
        textAlign: "center",
        textBaseline: "middle",
        ...this.config.props,
      },
    });
  }
}

export class Image extends Sprite {
  constructor(pos, props, config) {
    super(pos, config);
    this.props = props;
  }
  draw(ctx) {
    new Draw(ctx, "image", this.pos, this.props, {
      display: {
        ...this.config.display,
      },
      props: {
        ...this.config.props,
      },
    });
  }
}
