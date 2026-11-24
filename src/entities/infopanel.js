import { CONSTANTS } from "../constants.js";
import { UIElement } from "./uielement.js";

export class UIInfoPanelMessage extends UIElement {
  constructor({ message }) {
    super({ tagName: "li", id: crypto.randomUUID() });
    this.element.innerHTML = `> ${message}`;
  }

  init() {}

  onUpdate(state) {}
}

export class UIInfoPanel extends UIElement {
  constructor() {
    super({ tagName: "ul", id: CONSTANTS.INFO_PANEL });
  }

  init() {}

  onUpdate(state) {}

  /**
   * @param {UIInfoPanelMessage} uiElement
   */
  addElement(uiElement) {
    this.elements.push(uiElement);
    this.element.appendChild(uiElement.element);
    this.element.scrollTo({
      top: this.element.scrollHeight,
      behavior: "smooth",
    });
  }
}
