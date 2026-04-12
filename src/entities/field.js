import { UIElement } from "./uielement.js";
import { CONSTANTS } from "../constants.js";

export class UIField extends UIElement {
  constructor() {
    super({ tagName: "div", id: CONSTANTS.FIELD });
  }

  init() {}

  onUpdate(state) {}
}
