import { UIElement } from "./uielement.js";
import { UISkill } from "./skill.js";

export class Character {
  name = null;
  level = 0;
  maxHp = 0;
  currentHp = 0;
  skills = [];

  constructor({ name, level, skills }) {
    this.name = name;
    this.level = level;
    this.maxHp = 100;
    this.currentHp = 100;
    this.skills = skills;
  }
}

export class UICharacter extends UIElement {
  /** @type {Character} */
  character;

  constructor({ character }) {
    super({ tagName: "li", id: crypto.randomUUID() });
    this.character = character;
  }

  init() {
    this.element.classList.add("character");

    const labelElement = document.createElement("div");
    labelElement.innerText = `${this.character.name} (${this.character.currentHp}/${this.character.maxHp})`;
    this.element.appendChild(labelElement);

    this.character.skills.forEach((skill) => {
      const skillElement = new UISkill({ skill, parent: this });
      this.elements.push(skillElement);
      this.element.appendChild(skillElement.element);
    });
  }

  onUpdate(state) {}
}
