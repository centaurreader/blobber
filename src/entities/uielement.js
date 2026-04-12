/**
 * @typedef {{
 *   tagName: string;
 *   id: string;
 *   parent?: UIElement;
 * }} UIElementConfig
 */

export class UIElement {
  /** @type {HTMLElement} */
  element;

  tagName = null;

  elementId = null;

  elements = [];

  parent = null;

  /**
   * @param {UIElementConfig} config
   */
  constructor({ tagName, id, parent }) {
    this.tagName = tagName;
    this.elementId = id;
    this.bootstrapElement();
    this.parent = parent;
  }

  set id(id) {
    this.elementId = id;
  }

  get id() {
    return this.element.getAttribute("id");
  }

  bootstrapElement() {
    const element = document.createElement(this.tagName);
    element.setAttribute("id", this.elementId);
    this.element = element;
  }

  init() {
    console.error(this.element);
    throw new Error("UIElement does not implement init!");
  }

  addElement(uiElement) {
    this.elements.push(uiElement);
    this.element.appendChild(uiElement.element);
  }

  onUpdate() {
    console.error(this.element);
    throw new Error("UIElement does not impelement onUpdate!");
  }
}
