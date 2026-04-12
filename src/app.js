import { Engine, UITicker, UIPause } from "./engine.js";
import {
  Character,
  Enemy,
  Party,
  Skill,
  UIEnemy,
  UIField,
  UIInfoPanel,
  UIInfoPanelMessage,
  UIParty,
} from "./entities/index.js";
import { CONSTANTS } from "./constants.js";

class State {
  engine;

  /** @type {(import("./entities/index.js").UIElement)[]} */
  elements = [];

  initFn;

  /**
   * @param {{
   *   outlet: HTMLElement;
   *   initFn: (state: State) => void;
   * }} config
   */
  constructor({ outlet, initFn }) {
    this.outlet = outlet;
    this.initFn = initFn;
  }

  initElement(uiElement) {
    const existingElement = document.getElementById(uiElement.id);
    if (existingElement) {
      existingElement.replaceWith(uiElement.element);
    } else {
      this.outlet.appendChild(uiElement.element);
    }
    uiElement.init(this.engine);
    if (uiElement.elements.length) {
      uiElement.elements.forEach((e) => this.initElement(e));
    }
    uiElement.onUpdate(this);
  }

  init(engine) {
    this.engine = engine;
    this.initFn(this);
    this.elements.forEach((e) => this.initElement(e));
  }

  updateElement(uiElement) {
    uiElement.onUpdate(this);
    uiElement.elements.forEach((e) => this.updateElement(e));
  }

  update() {
    this.elements.forEach((e) => this.updateElement(e));
  }

  getElement(id) {
    return this.elements.find(({ id: elementId }) => elementId === id);
  }

  /**
   * @param {import("./entities/index.js").Enemy} mob
   */
  addMob(mob) {
    const field = this.getElement(CONSTANTS.FIELD);
    const uiEnemy = new UIEnemy({ enemy: mob, parent: field });
    field.addElement(uiEnemy);
    this.addMessage(`${mob.name} appears!`);
  }

  /**
   * @param {string} message
   */
  addMessage(message) {
    const infoPanel = this.getElement(CONSTANTS.INFO_PANEL);
    const uiInfoPanelMessage = new UIInfoPanelMessage({ message });
    infoPanel.addElement(uiInfoPanelMessage);
  }
}

const state = new State({
  outlet: document.getElementById("app"),
  initFn: (uiInstance) => {
    const char1 = new Character({
      name: "Angbar",
      level: 1,
      skills: [new Skill({ name: "Punch", cooldown: 10 })],
    });
    const char2 = new Character({
      name: "Bogo",
      level: 1,
      skills: [new Skill({ name: "Claw", cooldown: 5 })],
    });
    const char3 = new Character({
      name: "Chrysmann",
      level: 1,
      skills: [new Skill({ name: "Fireball", cooldown: 20 })],
    });
    const party = new Party({ characters: [char1, char2, char3] });
    const enemies = [
      new Enemy({
        name: "Wizard",
        level: 2,
        hp: 100,
        skills: [new Skill({ name: "Lightning", cooldown: 80 })],
      }),
      new Enemy({
        name: "Wizard",
        level: 1,
        hp: 100,
        skills: [new Skill({ name: "Lightning", cooldown: 150 })],
      }),
      new Enemy({
        name: "Slime",
        level: 3,
        hp: 10,
        skills: [new Skill({ name: "Ooze", cooldown: 30 })],
      }),
      new Enemy({
        name: "Slime",
        level: 4,
        hp: 10,
        skills: [new Skill({ name: "Ooze", cooldown: 30 })],
      }),
      new Enemy({
        name: "Slime",
        level: 5,
        hp: 10,
        skills: [new Skill({ name: "Ooze", cooldown: 25 })],
      }),
    ];
    uiInstance.elements.push(new UIField());
    uiInstance.elements.push(new UIParty({ party }));
    uiInstance.elements.push(new UIInfoPanel());
    uiInstance.elements.push(new UITicker());
    uiInstance.elements.push(new UIPause());
    enemies.forEach((enemy) => {
      uiInstance.addMob(enemy);
    });
  },
});

const eng = new Engine(state);
eng.init();
