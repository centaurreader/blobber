import { UIElement } from "./uielement.js";

export class Skill {
  name;

  level = 1;

  cooldown;

  /**
   *
   * @param {{
   *   name: string;
   *   cooldown: number;
   *   level?: number;
   * }} config
   */
  constructor({ name, cooldown, level }) {
    this.name = name;
    this.cooldown = cooldown;
    if (level) {
      console.log(level, name);
      this.level = level;
    }
  }

  get mod() {
    return this.cooldown / this.level + this.cooldown;
  }
}

export class UISkill extends UIElement {
  /** @type {Skill} */
  skill;

  value = 100;

  sliderValue = null;

  /**
   * @param {{
   *   skill: Skill;
   * } & Omit<import("./uielement.js").UIElementConfig, "tagName" | "id">} config
   */
  constructor({ parent, skill }) {
    super({ tagName: "button", id: crypto.randomUUID(), parent });
    this.skill = skill;
  }

  init() {
    this.element.classList.add("skill");

    const slider = document.createElement("div");
    slider.classList.add("skill__slider");
    const sliderValue = document.createElement("div");
    sliderValue.classList.add("skill__slider__value");
    slider.appendChild(sliderValue);
    this.sliderValue = sliderValue;
    this.element.appendChild(slider);

    const label = document.createElement("div");
    label.classList.add("skill__label");
    label.innerText = this.skill.name;
    this.element.appendChild(label);
  }

  onUpdate(state) {
    if (this.value <= 0) {
      state.addMessage(`${this.parent.name} uses ${this.skill.name}`);
      this.value = 100;
    } else {
      this.value -= 1 / this.skill.mod;
    }
    this.sliderValue.setAttribute("style", `width: ${this.value}%`);
  }
}
