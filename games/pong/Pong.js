("use strict");

import { Vec, Linear } from "../../js/math/Maths.js";
import { Scene, Rectangle, Circle, Line, Text } from "../../js/2d/Sprite.js";
import { Canvas, InputHandler, Engine } from "../../js/utility/Utils.js";

class Pong {
  constructor(id) {
    const canvas = new Canvas(id, "2d", 1024, 768, {
      class: "test contain",
    });
    const { ctx, width, height } = canvas;
    const states = {
      START_SCREEN: "start-screen",
      TRANSITION: "transition",
      GAME_SCREEN: "game-screen",
      PAUSE: "pause",
      RESET: "reset",
      WIN: "win",
    };
    const game = {
      state: states.GAME_SCREEN,
      paused: false,
    };
    const inputHandler = new InputHandler(canvas, {
      keys: ["p", "w", "s", "1", "2"],
    });
    const p2_inputHandler = new InputHandler(canvas, {
      keys: ["o", "l"],
    });
    const { mouse, keys } = inputHandler;
    const keys2 = p2_inputHandler.keys;
    const center = new Vec(width, height).scale(0.5);
    const engine = new Engine(30);

    //TITLE SCREEN
    const title_screen = new Scene(new Vec(0));
    const title_screen_cam = title_screen.camera;

    let alpha = 0;
    let alphaOffset = 1.95;
    const title = this.#_setupTitle(center, width, height);
    const updateTitle = this.#_updateTitle(title, alpha, alphaOffset);
    title[3].hover = false;

    title_screen_cam.add(...title);
    title_screen.update((t) => {});

    // GAME SCREEN
    const game_screen = new Scene(new Vec(0));
    const game_screen_cam = game_screen.camera;

    const scores = [0, 0];
    const players = [true, true];
    const game_info = this.#_setupGameInfo(center, players, scores);
    const updateGameInfo = this.#_updateGameInfo(game_info, scores, players);

    const game_bounds = this.#_setupGameBounds(width, height, center);
    const court_lines = this.#_setupCourtLines(center);
    const paddles = this.#_setupPaddles(center, height);

    const ball = this.#_setupBall(center);
    const updatePaddles = this.#_updatePaddles(
      game,
      states,
      paddles,
      game_bounds,
      players,
      scores,
      keys,
      keys2,
      ball
    );
    const updateBall = this.#_updateBall(
      game,
      states,
      center,
      ball,
      paddles,
      game_bounds,
      scores
    );

    game_screen_cam.add(
      ...game_info,
      ...game_bounds,
      ...court_lines,
      ...paddles,
      ball
    );

    // MOUSE UPDATES
    inputHandler.updateMousemove(() => {
      if (
        mouse.pos[0] > title[3].faces[3].x &&
        mouse.pos[0] < title[3].faces[1].x &&
        mouse.pos[1] > title[3].faces[0].y &&
        mouse.pos[1] < title[3].faces[2].y
      ) {
        title[3].hover = true;
      } else {
        title[3].hover = false;
      }
    });

    // KEYBOARD UPDATES
    inputHandler.updateKeydown(() => {
      console.log(keys[0]);
      if (keys[0] === "1") players[0] = !players[0];
      if (keys[0] === "2") players[1] = !players[1];
    });

    // ENGINE
    engine.update((t) => {
      updateTitle(t);
      updatePaddles(t);
      updateBall(t);
      updateGameInfo(t);
    });
    engine.draw(() => {
      ctx.clearRect(0, 0, width, height);
      switch (game.state) {
        case states.START_SCREEN:
          title_screen_cam.drawChildren(ctx);
          break;
        case states.TRANSITION:
          game_screen_cam.drawChildren(ctx);
          title_screen_cam.drawChildren(ctx);
          break;
        case states.GAME_SCREEN:
          game_screen_cam.drawChildren(ctx);
          break;
      }
    });
    engine.start();
  }
  #_setupTitle(center, width, height) {
    const catchFrases = [
      "As seen on tv!",
      "Better than GTA VI!",
      "Yup... Pong.",
      "For when you have nothing better to do!",
      "The best thing since table tenis!",
      "Now with improved gameplay!... Kinda.",
      "Insert coin...",
      "Tournament Edition",
      "Turbo II",
      "Let's go, Bub!",
      "To Pong, or not to Pong...",
      "Who lives in a pineapple under the sea?",
      "Your worst nightmare!",
      "For lols and rofls!",
      "Will do backflips for a Scooby Snack!",
      "Buy Grelka's armor!",
      "Know its name, and fear it!",
      "Without the ping!",
      "Awww snap! Here we go again!",
      "More porridge?!",
      "Now with 30% less sugar!",
      "Mutant Ninja Turtles",
      "[ Insert catchy frase here... ]",
    ];
    const title = [
      new Rectangle(
        center,
        { size: new Vec(width, height) },
        {
          display: { fill: true },
          props: { fillStyle: "#000" },
        }
      ),
      new Text(
        center.scale2(1, 0.5),
        { text: "Pong" },
        {
          display: { fill: true },
          props: { fillStyle: "#FFF", font: "128px system-ui, monospace" },
        }
      ),
      new Text(
        center.scale2(1, 0.75),
        { text: catchFrases[Math.floor(Math.random() * catchFrases.length)] },
        {
          display: { fill: true },
          props: { fillStyle: "#FFF", font: "28px system-ui, monospace" },
        }
      ),
      new Rectangle(
        center,
        { size: center.scale2(0.3, 0.2) },
        {
          display: { stroke: true },
          props: { strokeStyle: "#FFF", lineWidth: 5 },
        }
      ),
      new Text(
        center,
        { text: "Start" },
        {
          display: { fill: true },
          props: { fillStyle: "#FFF", font: "48px system-ui, monospace" },
        }
      ),
      new Text(
        center.scale2(0.5, 1.8),
        { text: "Play more games at terrytocs.github.io" },
        {
          display: { fill: true },
          props: { fillStyle: "#FFF", font: "24px system-ui, monospace" },
        }
      ),
    ];
    return title;
  }
  #_updateTitle(title, alpha, alphaOffset) {
    return function updateTitle(t) {
      alpha = alpha > Math.PI * 2 ? 0 : (alpha += 0.1);
      title[3].update(function (t) {
        if (this.hover) {
          alpha = 0;
          this.config.props.strokeStyle = `#FFF`;
          return;
        }
        this.config.props.strokeStyle = `rgba(255,255,255,${
          (Math.sin(alpha) + alphaOffset) / 2
        })`;
      });
      title[4].update(function (t) {
        if (title[3].hover) {
          alpha = 0;
          this.config.props.fillStyle = `#FFF`;
          return;
        }
        this.config.props.fillStyle = `rgba(255,255,255,${
          (Math.sin(alpha) + alphaOffset) / 2
        })`;
      });
    };
  }
  #_setupGameInfo(center, players, scores) {
    const game_info = [
      new Text(
        center.scale2(0.4, 0.1),
        { text: `Player 1 Score: ${scores[0]}` },
        {
          display: { fill: true },
          props: { fillStyle: "#FFF", font: "24px monospace" },
        }
      ),
      new Text(
        center.scale2(1.6, 0.1),
        { text: `Player 2 Score: ${scores[1]}` },
        {
          display: { fill: true },
          props: { fillStyle: "#FFF", font: "24px monospace" },
        }
      ),
      new Text(
        center.scale2(0.8, 0.1),
        { text: `${players[0] ? "P1" : "CPU"}` },
        {
          display: { fill: true },
          props: { fillStyle: "#FFF", font: "24px monospace" },
        }
      ),
      new Text(
        center.scale2(1.2, 0.1),
        { text: `${players[1] ? "P2" : "CPU"}` },
        {
          display: { fill: true },
          props: { fillStyle: "#FFF", font: "24px monospace" },
        }
      ),
    ];
    return game_info;
  }
  #_updateGameInfo(game_info, scores, players) {
    return function (t) {
      game_info[0].update(function () {
        this.props.text = `Player 1 score: ${scores[0]}`;
      });
      game_info[1].update(function () {
        this.props.text = `Player 2 score: ${scores[1]}`;
      });
      game_info[2].update(function () {
        this.props.text = `${players[0] ? "P1" : "CPU"}`;
      });
      game_info[3].update(function () {
        this.props.text = `${players[1] ? "P2" : "CPU"}`;
      });
    };
  }
  #_setupGameBounds(width, height, center) {
    const game_bounds = [
      new Rectangle(
        center.scale2(1, 0.15),
        { size: new Vec((width * 91) / 100, 10) },
        { display: { fill: true }, props: { fillStyle: "#FFF" } }
      ),
      new Rectangle(
        center.scale2(1.9, 1),
        { size: new Vec(10, (height * 85) / 100) },
        { display: { fill: true }, props: { fillStyle: "#FFF" } }
      ),
      new Rectangle(
        center.scale2(1, 1.85),
        { size: new Vec((width * 91) / 100, 10) },
        { display: { fill: true }, props: { fillStyle: "#FFF" } }
      ),
      new Rectangle(
        center.scale2(0.1, 1),
        { size: new Vec(10, (height * 85) / 100) },
        { display: { fill: true }, props: { fillStyle: "#FFF" } }
      ),
    ];
    return game_bounds;
  }
  #_setupCourtLines(center) {
    const court_lines = [
      new Circle(
        center,
        { size: center.scale(0.1) },
        {
          display: { stroke: true },
          props: { strokeStyle: "#FFF", lineWidth: 10 },
        }
      ),
      new Line(
        center.scale2(1, 0.87),
        { points: [center.scale2(1, 0.15)] },
        {
          display: { stroke: true },
          props: { strokeStyle: "#FFF", lineWidth: 10 },
        }
      ),
      new Line(
        center.scale2(1, 1.13),
        { points: [center.scale2(1, 1.85)] },
        {
          display: { stroke: true },
          props: { strokeStyle: "#FFF", lineWidth: 10 },
        }
      ),
    ];
    return court_lines;
  }
  #_setupPaddles(center, height) {
    const paddles = [
      new Rectangle(
        center.scale2(0.2, 1),
        { size: new Vec(10, (height * 20) / 100) },
        { display: { fill: true }, props: { fillStyle: "#FFF" } }
      ),
      new Rectangle(
        center.scale2(1.8, 1),
        { size: new Vec(10, (height * 20) / 100) },
        { display: { fill: true }, props: { fillStyle: "#FFF" } }
      ),
    ];
    return paddles;
  }
  #_updatePaddles(
    game,
    states,
    paddles,
    game_bounds,
    players,
    scores,
    keys,
    keys2,
    ball
  ) {
    paddles[0].vel = new Vec(0);
    paddles[1].vel = new Vec(0);
    const vel = 400;
    return function (t) {
      paddles[0].vel.y = 0;
      paddles[1].vel.y = 0;
      if (!(game.state === states.GAME_SCREEN) || game.paused) return;
      if (!players[0]) {
        if (ball.pos.y < paddles[0].pos.y) paddles[0].vel.y = -vel;
        if (ball.pos.y > paddles[0].pos.y) paddles[0].vel.y = vel;
      }
      if (!players[1]) {
        if (ball.pos.y < paddles[1].pos.y) paddles[1].vel.y = -vel;
        if (ball.pos.y > paddles[1].pos.y) paddles[1].vel.y = vel;
      }
      if (players[0]) {
        if (keys[0] === "w") paddles[0].vel.y = -vel;
        if (keys[0] === "s") paddles[0].vel.y = vel;
      }
      if (players[1]) {
        if (keys2[0] === "o") paddles[1].vel.y = -vel;
        if (keys2[0] === "l") paddles[1].vel.y = vel;
      }
      for (let i = 0; i < paddles.length; ++i) {
        paddles[i].update(function () {
          this.translate(this.vel.scale(t));
          if (this.faces[0].y <= game_bounds[0].faces[2].y)
            this.translate(
              game_bounds[0].faces[2].sub(this.faces[0]).scale2(0, 1)
            );
          if (this.faces[2].y >= game_bounds[2].faces[0].y)
            this.translate(
              game_bounds[2].faces[0].sub(this.faces[2]).scale2(0, 1)
            );
        });
      }
    };
  }
  #_setupBall(center) {
    const ball = new Circle(
      center,
      { size: center.scale(0.025) },
      {
        display: { fill: true },
        props: { fillStyle: "#FFF" },
      }
    );
    return ball;
  }
  #_updateBall(game, states, center, ball, paddles, game_bounds, scores) {
    const dirs = [
      Math.PI * 0.25,
      Math.PI * 0.75,
      Math.PI * -0.25,
      Math.PI * -0.75,
    ];
    ball.init = function () {
      this.pos = center;
      this.vel = Vec.polar(dirs[Math.floor(Math.random() * dirs.length)], 200);
    };
    ball.init();
    return function (t) {
      if (game.state !== states.GAME_SCREEN || game.paused) return;
      ball.update(function () {
        if (
          this.faces[0].y <= game_bounds[0].faces[2].y ||
          this.faces[2].y >= game_bounds[2].faces[0].y
        )
          this.vel.y *= -1;
        if (this.faces[3].x <= game_bounds[3].faces[1].x) {
          scores[1] += 10;
          ball.init();
        }
        if (this.faces[1].x >= game_bounds[1].faces[3].x) {
          scores[0] += 10;
          ball.init();
        }
        if (
          this.faces[3].x <= paddles[0].faces[1].x &&
          this.faces[3].x >= paddles[0].faces[3].x &&
          this.faces[2].y >= paddles[0].faces[0].y &&
          this.faces[0].y <= paddles[0].faces[2].y
        )
          this.vel.x =
            Math.abs(this.vel.x) < 300 ? this.vel.x * -1.2 : this.vel.x * -1;
        if (
          this.faces[1].x >= paddles[1].faces[3].x &&
          this.faces[1].x <= paddles[1].faces[1].x &&
          this.faces[2].y >= paddles[1].faces[0].y &&
          this.faces[0].y <= paddles[1].faces[2].y
        )
          this.vel.x =
            Math.abs(this.vel.x) < 300 ? this.vel.x * -1.2 : this.vel.x * -1;
        this.translate(this.vel.scale(t));
      });
    };
  }
}

window.addEventListener("load", new Pong("_canvas_container"));
