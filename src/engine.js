import { UIElement } from "./entities/index.js";
import { CONSTANTS } from "./constants";

export class Engine {
  game = null;

  fps = 30;
  loops = 0;
  skipTicks = 0;
  maxFrameSkip = 10;
  nextGameTick = new Date().getTime();

  constructor(game) {
    this.game = game;

    this.skipTicks = 1000 / this.fps;
    this.nextGameTick = new Date().getTime();
  }

  pause() {
    this.nextGameTick = -1;
  }

  resume() {
    this.nextGameTick = new Date().getTime();
  }

  update() {
    this.game.update();
  }

  run() {
    this.loops = 0;

    while (
      this.nextGameTick > 0 &&
      new Date().getTime() > this.nextGameTick &&
      this.loops < this.maxFrameSkip
    ) {
      this.update();
      this.nextGameTick += this.skipTicks;
      this.loops++;
    }

    if (this.loops) {
      this.update();
    }
  }

  init() {
    let onEachFrame;
    // @ts-ignore
    if (window.webkitRequestAnimationFrame) {
      onEachFrame = (cb) => {
        const _cb = () => {
          cb();
          // @ts-ignore
          // eslint-disable-next-line no-undef
          webkitRequestAnimationFrame(_cb);
        };
        _cb();
      };
      // @ts-ignore
    } else if (window.mozRequestAnimationFrame) {
      onEachFrame = (cb) => {
        const _cb = () => {
          cb();
          // @ts-ignore
          // eslint-disable-next-line no-undef
          mozRequestAnimationFrame(_cb);
        };
        _cb();
      };
    } else {
      onEachFrame = (cb) => {
        setInterval(cb, 1000 / 60);
      };
    }

    this.game.init(this);

    onEachFrame(() => this.run());
  }
}

export class UIPause extends UIElement {
  name = CONSTANTS.PAUSE;

  constructor() {
    super({ tagName: "button", id: "pause" });
  }

  init(engine) {
    this.element.innerHTML = "Pause";
    this.element.addEventListener("click", () => {
      if (engine.nextGameTick === -1) {
        engine.resume();
        this.element.innerHTML = "Pause";
      } else {
        engine.pause();
        this.element.innerHTML = "Unpause";
      }
    });
  }

  onUpdate(state) {}
}

export class UITicker extends UIElement {
  constructor() {
    super({ tagName: "button", id: CONSTANTS.TICKER });
  }

  init() {}

  onUpdate(state) {
    this.element.innerText = Math.random().toString();
  }
}
