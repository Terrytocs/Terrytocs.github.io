("use strict");

import { Scene, Rectangle, Circle, Text } from "../../js/2d/Sprite.js";
import { Canvas, Engine, InputHandler } from "../../js/utility/Utils.js";
import { Linear, Vec } from "../../js/math/Maths.js";

class Breakout {
  constructor(id) {
    const canvas = new Canvas(id, "2d", 1024, 768, {
      class: "test contain",
    });
    const { ctx, width, height } = canvas;
    const center = new Vec(width, height).scale(0.5);
    const inputHandler = new InputHandler(canvas, {
      keys: ["arrowleft", "arrowright", "p"],
    });
    const { keys, mouse } = inputHandler;
    const engine = new Engine(30);
    const states = {
      START_SCREEN: "start-screen",
      TRANSITION: "transition",
      COUNTDOWN: "countdown",
      GAME_SCREEN: "game-screen",
      PAUSE_SCREEN: "pause-screen",
      WIN_SCREEN: "win-screen",
      LOSE_SCREEN: "lose-screen",
      RESET: "reset",
    };
    const game = {
      state: states.START_SCREEN,
      paused: false,
      score: 0,
    };

    // START SCREEN
    const start_screen_scene = new Scene(new Vec(0));
    const start_screen_cam = start_screen_scene.camera;

    const start_screen = this.#_setupStartScreen(center, width, height);
    const update_start_screen = this.#_updateStartScreen(start_screen);

    start_screen_cam.add(...start_screen);
    start_screen_scene.update(function (t) {
      if (this.pos.x <= -width) game.state = states.COUNTDOWN;
      this.translate(new Vec(Linear.lerp(0, -width, t), 0));
    });

    // COUNTDOWN SCREEN
    const countdown_screen_scene = new Scene(new Vec(0));
    const countdown_screen_cam = countdown_screen_scene.camera;

    const countdown_screen = this.#_setupCountdownScreen(center);
    const update_countdown_screen = this.#_updateCountdownScreen(
      countdown_screen,
      game,
      states
    );

    countdown_screen_cam.add(...countdown_screen.scene);

    // GAME SCREEN
    const game_screen_scene = new Scene(new Vec(0));
    const game_screen_cam = game_screen_scene.camera;

    const game_screen = this.#_setupGameScreen(center);
    const update_game_screen = this.#_updateGameScreen(
      game_screen,
      keys,
      game,
      states
    );

    game_screen_cam.add(...game_screen.scene);

    // PAUSE SCREEN
    const pause_screen_scene = new Scene(new Vec(0));
    const pause_screen_cam = pause_screen_scene.camera;

    const pause_screen = this.#_setupPauseScreen(center);
    const update_pause_screen = this.#_updatePauseScreen(game, states);

    pause_screen_cam.add(...pause_screen.scene);

    // WIN SCREEN
    const win_screen_scene = new Scene(new Vec(0));
    const win_screen_cam = win_screen_scene.camera;

    const win_screen = this.#_setupWinScreen(center);
    const update_win_screen = this.#_updateWinScreen(game, states);

    win_screen_cam.add(...win_screen.scene);

    // LOSE SCREEN
    const lose_screen_scene = new Scene(new Vec(0));
    const lose_screen_cam = lose_screen_scene.camera;

    const lose_screen = this.#_setupLoseScreen(center);
    const update_lose_screen = this.#_updateLoseScreen(
      lose_screen,
      game,
      states
    );

    lose_screen_cam.add(...lose_screen.scene);

    //RESET
    const updateReset = this.#_updateReset(game_screen, game, states);

    // KEYBOARD INPUT
    inputHandler.updateKeydown(() => {
      if (
        game.state === states.GAME_SCREEN ||
        game.state === states.PAUSE_SCREEN
      ) {
        if (keys[0] === "p") game.paused = !game.paused;
      }
    });

    // MOUSE INPUT
    const button = start_screen[2];
    inputHandler.updateMousemove(() => {
      if (button.contains(new Vec(mouse.pos[0], mouse.pos[1]))) {
        canvas.style.cursor = "pointer";
        button.hover = true;
      } else {
        canvas.style.cursor = "default";
        button.hover = false;
      }
    });
    inputHandler.updateClick(() => {
      if (button.hover) game.state = states.TRANSITION;
    });

    //  ENGINE
    engine.update((t) => {
      switch (game.state) {
        case states.START_SCREEN:
          update_start_screen(t);
          break;
        case states.TRANSITION:
          start_screen_scene.update(t);
          break;
        case states.COUNTDOWN:
          update_countdown_screen(t);
          break;
        case states.GAME_SCREEN:
          update_game_screen(t);
          break;
        case states.PAUSE_SCREEN:
          update_pause_screen(t);
          break;
        case states.WIN_SCREEN:
          update_win_screen(t);
          break;
        case states.LOSE_SCREEN:
          update_lose_screen(t);
          break;
        case states.RESET:
          updateReset();
          break;
      }
    });
    engine.draw(() => {
      ctx.clearRect(0, 0, width, height);
      switch (game.state) {
        case states.START_SCREEN:
          start_screen_cam.drawChildren(ctx);
          break;
        case states.TRANSITION:
          game_screen_cam.drawChildren(ctx);
          start_screen_cam.drawChildren(ctx);
          break;
        case states.COUNTDOWN:
          game_screen_cam.drawChildren(ctx);
          countdown_screen_cam.drawChildren(ctx);
          break;
        case states.GAME_SCREEN:
          game_screen_cam.drawChildren(ctx);
          break;
        case states.PAUSE_SCREEN:
          game_screen_cam.drawChildren(ctx);
          pause_screen_cam.drawChildren(ctx);
          break;
        case states.WIN_SCREEN:
          game_screen_cam.drawChildren(ctx);
          win_screen_cam.drawChildren(ctx);
          break;
        case states.LOSE_SCREEN:
          game_screen_cam.drawChildren(ctx);
          lose_screen_cam.drawChildren(ctx);
          break;
      }
    });
    engine.start();
  }
  #_updateWinScreen(game, states) {
    let alpha = 3;
    return function (t) {
      alpha -= t;
      if (alpha <= 0) {
        alpha = 3;
        game.state = states.RESET;
      }
    };
  }
  #_setupWinScreen(center) {
    const background = new Rectangle(
      center,
      { size: center },
      { display: { fill: true }, props: { fillStyle: "#000E" } }
    );
    const text = new Text(
      center,
      { text: "You Win!" },
      {
        display: { fill: true },
        props: { fillStyle: "#FFF", font: "64px monospace" },
      }
    );

    return {
      background: background,
      text: text,

      scene: [background, text],
    };
  }
  #_updateReset(game_screen, game, states) {
    const { ball, paddle, bricks } = game_screen;

    return function () {
      ball.pos = ball.initPos;
      ball.init();
      paddle.pos = paddle.initPos;
      for (let i = 0; i < bricks.length; ++i) {
        bricks[i].canCollide = true;
        bricks[i].isVisible = true;
      }
      game.score = 0;
      game.state = states.COUNTDOWN;
    };
  }
  #_updateLoseScreen(lose_screen, game, states) {
    const { score } = lose_screen;
    let alpha = 3;
    return function (t) {
      alpha -= t;
      if (alpha <= 0) {
        alpha = 3;
        game.state = states.RESET;
      }
      score.update(function () {
        this.props.text = `${game.score}`;
      });
    };
  }
  #_setupLoseScreen(center) {
    const background = new Rectangle(
      center,
      { size: center },
      { display: { fill: true }, props: { fillStyle: "#000E" } }
    );
    const text = new Text(
      center.scale2(1, 0.75),
      { text: "Your score" },
      {
        display: { fill: true },
        props: { fillStyle: "#FFF", font: "32px monospace" },
      }
    );
    const score = new Text(
      center,
      { text: "0" },
      {
        display: { fill: true },
        props: { fillStyle: "#FFF", font: "64px monospace" },
      }
    );
    return {
      background: background,
      text: text,
      score: score,
      scene: [background, text, score],
    };
  }
  #_updatePauseScreen(game, states) {
    return function (t) {
      if (!game.paused) game.state = states.GAME_SCREEN;
    };
  }
  #_setupPauseScreen(center) {
    const background = new Rectangle(
      center,
      { size: center },
      { display: { fill: true }, props: { fillStyle: "#000E" } }
    );
    const text = new Text(
      center,
      { text: "Paused" },
      {
        display: { fill: true },
        props: { fillStyle: "#FFF", font: "64px monospace" },
      }
    );

    return {
      background: background,
      text: text,
      scene: [background, text],
    };
  }
  #_updateCountdownScreen(countdown_screen, game, states) {
    const { countdown } = countdown_screen;
    let alpha = 0;
    let num = 3;
    return function (t) {
      alpha += t;
      if (alpha >= 2) {
        num--;
        alpha = 0;
      }
      if (num === 0) {
        num = 3;
        game.state = states.GAME_SCREEN;
      }
      countdown.update(function () {
        this.props.text = `${num}`;
      });
    };
  }
  #_setupCountdownScreen(center) {
    const text = [
      new Text(
        center.scale2(1, 0.75),
        { text: "Game Starts" },
        {
          display: { fill: true },
          props: { fillStyle: "#FFF", font: "32px monospace" },
        }
      ),
      new Text(
        center,
        { text: "in" },
        {
          display: { fill: true },
          props: { fillStyle: "#FFF", font: "32px monospace" },
        }
      ),
    ];
    const countdown = new Text(
      center.scale2(1, 1.25),
      { text: "3" },
      {
        display: { fill: true },
        props: { fillStyle: "#FFF", font: "64px monospace" },
      }
    );
    return {
      text: text,
      countdown: countdown,
      scene: [
        new Rectangle(
          center,
          { size: center },
          { display: { fill: true }, props: { fillStyle: "#000E" } }
        ),
        ...text,
        countdown,
      ],
    };
  }
  #_updateGameScreen(game_screen, keys, game, states) {
    const { info, bounds, bricks, paddle, ball } = game_screen;
    const hit_bricks = [];

    for (let i = 0; i < bricks.length; ++i) {
      bricks[i].canCollide = true;
    }
    paddle.vel = new Vec(0, 0);
    paddle.canCollide = true;
    ball.canCollide = true;
    ball.init = function () {
      this.vel = Vec.polar(
        Linear.lerp(-Math.PI * 0.75, -Math.PI * 0.25, Math.random()),
        300
      );
    };
    ball.init();
    return function (t) {
      if (game.paused) game.state = states.PAUSE_SCREEN;
      if (hit_bricks.length === bricks.length) {
        hit_bricks.length = 0;
        game.state = states.WIN_SCREEN;
      }
      info[0].update(function () {
        this.props.text = `Score: ${game.score}`;
      });
      paddle.update(function () {
        this.vel.x = 0;
        if (keys[0] === "arrowleft") this.vel.x = -1000;
        if (keys[0] === "arrowright") this.vel.x = 1000;

        this.translate(this.vel.scale(t));
        if (this.faces[3].x <= bounds[3].faces[1].x)
          this.translate(bounds[3].faces[1].sub(this.faces[3]).scale2(1, 0));
        if (this.faces[1].x >= bounds[1].faces[3].x)
          this.translate(bounds[1].faces[3].sub(this.faces[1]).scale2(1, 0));
      });
      ball.update(function () {
        if (this.faces[2].y >= bounds[2].faces[0].y) {
          hit_bricks.length = 0;
          game.state = states.LOSE_SCREEN;
        }
        if (this.faces[0].y <= bounds[0].faces[2].y) this.vel.y *= -1;
        if (
          this.faces[3].x <= bounds[3].faces[1].x ||
          this.faces[1].x >= bounds[1].faces[3].x
        )
          this.vel.x *= -1;

        for (let i = 0; i < bricks.length; ++i) {
          if (!bricks[i].canCollide) continue;
          if (this.boundTest(this, bricks[i])) {
            const vec = bricks[i].pos.sub(this.pos);
            const rad = this.pos.add(vec.normalize().scale(this.boundRadius));
            if (bricks[i].contains(rad)) {
              const top = Vec.intersectionTime(
                this.pos,
                rad,
                bricks[i].vertices[0],
                bricks[i].vertices[1]
              );
              const right = Vec.intersectionTime(
                this.pos,
                rad,
                bricks[i].vertices[1],
                bricks[i].vertices[2]
              );
              const bottom = Vec.intersectionTime(
                this.pos,
                rad,
                bricks[i].vertices[2],
                bricks[i].vertices[3]
              );
              const left = Vec.intersectionTime(
                this.pos,
                rad,
                bricks[i].vertices[3],
                bricks[i].vertices[0]
              );

              if (top) {
                this.translate(
                  bricks[i].faces[0].sub(this.faces[2]).scale2(0, 1)
                );
                this.vel.y *= -1;
                game.score += 10;
                hit_bricks.push(bricks[i]);
                bricks[i].canCollide = false;
                bricks[i].isVisible = false;
              }
              if (right) {
                this.translate(
                  bricks[i].faces[1].sub(this.faces[3]).scale2(1, 0)
                );
                this.vel.x *= -1;
                game.score += 10;
                hit_bricks.push(bricks[i]);
                bricks[i].canCollide = false;
                bricks[i].isVisible = false;
              }
              if (bottom) {
                this.translate(
                  bricks[i].faces[2].sub(this.faces[0]).scale2(0, 1)
                );
                this.vel.y *= -1;
                game.score += 10;
                hit_bricks.push(bricks[i]);
                bricks[i].canCollide = false;
                bricks[i].isVisible = false;
              }
              if (left) {
                this.translate(
                  bricks[i].faces[3].sub(this.faces[1]).scale2(1, 0)
                );
                this.vel.x *= -1;
                game.score += 10;
                hit_bricks.push(bricks[i]);
                bricks[i].canCollide = false;
                bricks[i].isVisible = false;
              }
            }
          }
        }

        if (this.boundTest(this, paddle)) {
          const vec = paddle.pos.sub(this.pos);
          const rad = this.pos.add(vec.normalize().scale(this.boundRadius));
          if (paddle.contains(rad)) {
            const top = Vec.intersectionTime(
              this.pos,
              rad,
              paddle.vertices[0],
              paddle.vertices[1]
            );
            const right = Vec.intersectionTime(
              this.pos,
              rad,
              paddle.vertices[1],
              paddle.vertices[2]
            );
            const bottom = Vec.intersectionTime(
              this.pos,
              rad,
              paddle.vertices[2],
              paddle.vertices[3]
            );
            const left = Vec.intersectionTime(
              this.pos,
              rad,
              paddle.vertices[3],
              paddle.vertices[0]
            );

            if (top) {
              this.translate(paddle.faces[0].sub(this.faces[2]).scale2(0, 1));
              this.vel.y *= -1;
            }
            if (right) {
              this.translate(paddle.faces[1].sub(this.faces[3]).scale2(1, 0));
              this.vel.x *= -1;
            }
            if (bottom) {
              this.translate(paddle.faces[2].sub(this.faces[0]).scale2(0, 1));
              this.vel.y *= -1;
            }
            if (left) {
              this.translate(paddle.faces[3].sub(this.faces[1]).scale2(1, 0));
              this.vel.x *= -1;
            }
          }
        }
        this.translate(this.vel.scale(t));
      });
    };
  }
  #_setupGameScreen(center) {
    let score = 0;
    const info = [
      new Text(
        center.scale2(0.2, 0.1),
        { text: `Score: ${score}` },
        {
          display: { fill: true },
          props: { fillStyle: "#FFF", font: "24px monospace" },
        }
      ),
    ];
    const bounds = [
      new Rectangle(
        center.scale2(1, 0.15),
        { size: new Vec(center.x, 10).scale2(1.8, 1) },
        { display: { fill: true }, props: { fillStyle: "#FFF" } }
      ),
      new Rectangle(
        center.scale2(1.9, 1),
        { size: new Vec(10, center.y).scale2(1, 1.725) },
        { display: { fill: true }, props: { fillStyle: "#FFF" } }
      ),
      new Rectangle(
        center.scale2(1, 1.85),
        { size: new Vec(center.x, 10).scale2(1.8, 1) },
        { display: { fill: true }, props: { fillStyle: "#FFF" } }
      ),
      new Rectangle(
        center.scale2(0.1, 1),
        { size: new Vec(10, center.y).scale2(1, 1.725) },
        { display: { fill: true }, props: { fillStyle: "#FFF" } }
      ),
    ];
    const bricks = [];
    const width = bounds[0].faces[3].sub(bounds[0].faces[1]).mag;
    const height = bounds[1].faces[0].sub(bounds[1].faces[2]).mag;
    for (let i = 1; i < 40; ++i) {
      if (i % 10 === 0) continue;
      const x = i % 10;
      const y = (i - x) / 10;
      bricks.push(
        new Rectangle(
          center.scale2(x * 0.2, y * 0.2).add2(0, height * 0.15),
          {
            size: new Vec(width, height).scale(0.1).add2(10, 10),
          },
          {
            display: { fill: true },
            props: { fillStyle: "#FFF" },
          }
        )
      );
    }
    const paddle = new Rectangle(
      center.scale2(1, 1.75),
      { size: new Vec(center.x, 30).scale2(0.3, 1) },
      { display: { fill: true }, props: { fillStyle: "#FFF" } }
    );
    paddle.initPos = center.scale2(1, 1.75);
    const ball = new Circle(
      center.scale2(1, 1.6),
      { size: new Vec(30) },
      { display: { fill: true }, props: { fillStyle: "#FFF" } }
    );
    ball.initPos = center.scale2(1, 1.6);
    return {
      score: score,
      info: info,
      bounds: bounds,
      bricks: bricks,
      paddle: paddle,
      ball: ball,

      scene: [...info, ...bricks, ...bounds, paddle, ball],
    };
  }
  #_setupStartScreen(center, width, height) {
    return [
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
        { text: "Breakout" },
        {
          display: { fill: true },
          props: { fillStyle: "#FFF", font: "128px monospace" },
        }
      ),
      // 2
      new Rectangle(
        center,
        { size: center.scale2(0.5, 0.25) },
        {
          display: { stroke: true },
          props: { strokeStyle: "#FFF", lineWidth: 10 },
        }
      ),
      // 3
      new Text(
        center,
        { text: "Start" },
        {
          display: { fill: true },
          props: { fillStyle: "#FFF", font: "64px monospace" },
        }
      ),
      new Text(
        center.scale2(0.6, 1.8),
        { text: "Play more games at terrytocs.github.io" },
        {
          display: { fill: true },
          props: { fillStyle: "#FFF", font: "24px monospace" },
        }
      ),
    ];
  }
  #_updateStartScreen(start_screen) {
    let alpha = 0;
    const func = (a) => (Math.sin(a) + 1.7) / 2;
    return function (t) {
      alpha += 0.1;
      if (alpha > Math.PI * 2) alpha = 0;
      const button = start_screen[2];
      start_screen[2].update(function () {
        if (button.hover) {
          alpha = 0;
          this.config.props.strokeStyle = `#FFF`;
          return;
        }
        this.config.props.strokeStyle = `rgba(255,255,255,${func(alpha)})`;
      });
      start_screen[3].update(function () {
        if (button.hover) {
          alpha = 0;
          this.config.props.fillStyle = `#FFF`;
          return;
        }
        this.config.props.fillStyle = `rgba(255,255,255,${func(alpha)})`;
      });
    };
  }
}

window.addEventListener("load", new Breakout("_canvas_container"));
