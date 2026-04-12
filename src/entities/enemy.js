import { UIElement } from "./uielement.js";
import { UISkill } from "./skill.js";

export class Enemy {
  name = null;
  level = 0;
  maxHp = null;
  currentHp = null;
  skills = [];

  constructor({ name, hp, level, skills }) {
    this.maxHp = hp;
    this.level = level;
    this.name = name;
    this.currentHp = hp;
    this.skills = skills;
    this.skills.forEach((skill) => (skill.mod = this.level));
  }
}

export class UIEnemy extends UIElement {
  elements = [];

  /** @type {Enemy} */
  enemy = null;

  /**
   * @param {{
   *   enemy: Enemy;
   * } & Omit<import("./uielement.js").UIElementConfig, "tagName" | "id">} config
   */
  constructor(config) {
    const { enemy } = config;
    super({ ...config, tagName: "div", id: crypto.randomUUID() });
    this.enemy = enemy;
  }

  init() {
    this.element.classList.add("enemy");
    this.element.innerText = `${this.enemy.name} (${this.enemy.currentHp}/${this.enemy.maxHp})`;
    this.enemy.skills.forEach((skill) => {
      const skillElement = new UISkill({ skill, parent: this });
      this.elements.push(skillElement);
      this.element.appendChild(skillElement.element);
    });
  }

  onUpdate(state) {}
}
