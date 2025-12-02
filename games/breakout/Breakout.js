("use strict");

import Canvas from "../../js/utils/Canvas.js";

class Breakout {
  constructor(id) {
    this.setup(id);
  }
  setup(id) {
    this.canvas = new Canvas(id, "2d", 1024, 768, {
      class: "test contain",
    });
    this.ctx = this.canvas.ctx;
  }
}

window.addEventListener("load", new Breakout("_canvas_container"));
