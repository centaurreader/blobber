import { UIElement } from "./uielement.js";
import { CONSTANTS } from "../constants.js";
import { UICharacter } from "./character.js";

export class Party {
  constructor({ characters }) {
    this.characters = characters;
    this.location = null;
  }
}

export class UIParty extends UIElement {
  /** @type {Party} */
  party;

  characters = [];

  /** @param {{ party: Party }} config */
  constructor({ party }) {
    super({ tagName: "ul", id: CONSTANTS.PARTY });
    this.party = party;
    this.characters = party.characters;
  }

  init() {
    this.characters.forEach((character) => {
      const characterElement = new UICharacter({ character });
      this.elements.push(characterElement);
      this.element.appendChild(characterElement.element);
    });
  }

  onUpdate(state) {}
}
