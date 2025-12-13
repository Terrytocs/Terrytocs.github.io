("use strict");

import { Scene, Circle, Text, Line } from "../../js/2d/Sprite.js";
import { Vec } from "../../js/math/Maths.js";
import { Canvas, Engine } from "../../js/utility/Utils.js";

class Clock {
  constructor(id) {
    const canvas = new Canvas(id, "2d", 1024, 1024, { class: "contain" });
    const { ctx, width, height } = canvas;
    const center = new Vec(width, height).scale(0.5);
    const engine = new Engine(30);
    const scene = new Scene(new Vec(0), center.scale(1.5));
    const cam = scene.camera;

    const face = new Circle(
      center,
      { size: center.scale(0.99) },
      {
        display: { fill: true, stroke: true },
        props: { fillStyle: "#000", strokeStyle: "#F00", lineWidth: 10 },
      }
    );

    let num = 0;
    const time = [];
    for (let i = 0; i < Math.PI * 2; i += Math.PI / 12) {
      if (num === 24) break;
      time.push(
        new Text(
          center.scale2(1, 0.1).rotate(center, i),
          { text: num === 0 ? "00" : num },
          {
            display: { fill: true },
            props: { fillStyle: "#0F0", font: "32px monospace" },
          }
        )
      );
      ++num;
    }
    num = 0;
    for (let i = 0; i < Math.PI * 2; i += Math.PI / 6) {
      if (num === 12) break;
      time.push(
        new Text(
          center.scale2(1, 0.2).rotate(center, i),
          { text: num === 0 ? "00" : num },
          {
            display: { fill: true },
            props: { fillStyle: "#0F0", font: "32px monospace" },
          }
        )
      );
      num += 5;
    }
    num = 0;
    for (let i = 0; i < Math.PI * 2; i += Math.PI / 30) {
      if (num === 60) break;
      if (num % 5 === 0) {
        ++num;
        continue;
      }
      time.push(
        new Line(
          center.scale2(1, 0.17).rotate(center, i),
          { points: [center.scale2(1, 0.2).rotate(center, i)] },
          {
            display: { stroke: true },
            props: { strokeStyle: "#0F0" },
          }
        )
      );
      ++num;
    }

    const hands = [];
    hands.push(
      new Line(
        center.scale2(1, 0.27).rotate(center, 0),
        { points: [center] },
        {
          display: { stroke: true },
          props: { strokeStyle: "#F00", lineWidth: 10, lineCap: "round" },
        }
      )
    );
    hands.push(
      new Line(
        center.scale2(1, 0.35).rotate(center, 0),
        { points: [center] },
        {
          display: { stroke: true },
          props: { strokeStyle: "#FFF", lineWidth: 15, lineCap: "round" },
        }
      )
    );
    hands.push(
      new Line(
        center.scale2(1, 0.5).rotate(center, 0),
        { points: [center] },
        {
          display: { stroke: true },
          props: { strokeStyle: "#FFF", lineWidth: 20, lineCap: "round" },
        }
      )
    );
    hands.push(
      new Circle(
        center,
        { size: new Vec(40) },
        {
          display: { fill: true },
          props: { fillStyle: "#FFF" },
        }
      )
    );
    hands[0].update(function (t) {
      const date = new Date();
      const secs = date.getSeconds();
      const milliSecs = date.getMilliseconds();
      this.pos = center
        .scale2(1, 0.27)
        .rotate(center, (secs * Math.PI) / 30 + (milliSecs * Math.PI) / 30000);
    });
    hands[1].update(function (t) {
      const date = new Date();
      const mins = date.getMinutes();
      const secs = date.getSeconds();
      this.pos = center
        .scale2(1, 0.35)
        .rotate(center, (mins * Math.PI) / 30 + (secs * Math.PI) / 1800);
    });
    hands[2].update(function (t) {
      const date = new Date();
      const hours = date.getHours();
      const mins = date.getMinutes();
      this.pos = center
        .scale2(1, 0.5)
        .rotate(center, (hours * Math.PI) / 12 + (mins * Math.PI) / 720);
    });

    cam.add(face, ...time, ...hands);
    engine.update((t) => {
      cam.updateChildren(t);
    });
    engine.draw(() => {
      ctx.clearRect(0, 0, width, height);
      cam.drawChildren(ctx);
    });
    engine.start();
  }
}

window.addEventListener("load", () => new Clock("_canvas_container"));
