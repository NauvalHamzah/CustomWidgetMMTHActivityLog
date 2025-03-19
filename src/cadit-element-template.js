import { LitElement, html, css } from "lit";
import { PTCS } from "ptcs-library/library.js";
import { L2Pw } from "ptcs-library/library-lit";
import "ptcs-button/ptcs-button.js";

export class WidgetElementTemplate extends PTCS.BehaviorTabindex(
  PTCS.BehaviorTooltip(
    PTCS.BehaviorFocus(PTCS.BehaviorStyleable(L2Pw(LitElement)))
  )
) {
  static get styles() {
    return css`
      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }

      :host {
        display: block;
      }
    `;
  }

  static get properties() {
    return {
      source: { type: String, notify: true },
      target: { type: String },
    };
  }

  static get is() {
    return "cadit-element-template";
  }

  constructor() {
    super();
    this.source = "default-source";
    this.target = "default-target";
  }

  sourceClicked() {
    this.source = (Math.floor(Math.random() * 100) + 1).toString();
    this.dispatchEvent(
      new CustomEvent("source-changed", {
        bubbles: true,
        composed: true,
      })
    );
  }

  logSource() {
    console.log(this.source);
  }

  render() {
    return html`<div>
      <ptcs-button
        label="Change Source"
        @click=${this.sourceClicked}
      ></ptcs-button>
      <div>${`Source: ${this.source}`}</div>
      <div>${`Target: ${this.target}`}</div>
    </div>`;
  }
}


