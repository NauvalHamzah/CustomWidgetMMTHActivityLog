/**
 * DESCRIPTION:
 * This is sample widget created as an example for Developing Custom Widget
 * --------------------------------------------------------------
 * [Revision] [Date] [Who] [What]
 * [DONE] [2023] [Saleh Zaidan] Initial creation of template
 * [DONE] [04 Jan 2023] [David Khowanto] Update dynamic import or lazy load library [this._import("")] and added descriptive comments
 * [DONE] [15 August 2024] [Ali Ilham] Combine with cli template 
*/

/* DOCUMENTATION: https://lit.dev/docs/ */
/* do not edit import - START */
import { LitElement, html, css } from "lit";
import { PTCS } from "ptcs-library/library.js";
import { L2Pw } from "ptcs-library/library-lit";
/* do not edit import - END */

import "ptcs-button/ptcs-button.js";

/**
  * Call other component in current directory.
*/
import { WidgetElementTemplate } from './cadit-element-template.js';
// @ts-ignore
customElements.define(WidgetElementTemplate.is, WidgetElementTemplate);

export class WidgetTemplate extends PTCS.BehaviorTabindex(
  PTCS.BehaviorTooltip(
    PTCS.BehaviorFocus(PTCS.BehaviorStyleable(L2Pw(LitElement)))
  )
) {
   /**
   * Returns the CSS styles for the component.
   *
   * @return {import("lit").CSSResult} The CSS styles for the component.
   */
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

  /**
   * Returns an object with the properties of the class.
   *
   * @return {Object} The properties of the class.
   */
  static get properties() {
    return {
      source: { type: String, notify: true },
      target: { type: String },
    };
  }

  /**
   * Returns the web component name of the widget.
   *
   * @return {string} The web component name of the widget.
   */
  static get is() {
    return "cadit-mmth-activity-log";
  }

  /**
   * Returns the path of the given asset.
   *
   * @param {string} filename The asset filename.
   * @return {string} The asset path.
   */
  getAssetPath(filename) {
    const isDevMode = !window.location.href.includes("/Thingworx");
    if (isDevMode) {
      return `../src/assets/${filename}`;
    }
    return `../extensions/${WidgetTemplate.is}/assets/${filename}`;
  }

  /**
   * Imports a library asynchronously.
   *
   * @return {Promise<void>} A promise that resolves when the library is imported.
   */
  async _importLibraries() {
    await import("ptcs-button/ptcs-button.js");
    // Add more dynamically imported libraries here
  }

  /**
   * Initializes a new instance of the class.
   *
   * @constructor
   */
  constructor() {
    super();
    this.source = "default-source";
    this.target = "default-target";
  }

  /**
   * **Example for Private Method/Function**
   *
   * Generates a random number between 1 and 100 and assigns it to the "source" property.
   * Dispatches a custom event named "source-changed" with bubbles and composed set to true.
   *
   * @param {type} paramName Description of parameter
   * @return {type} Description of return value
   */
  sourceClicked() {
    this.source = (Math.floor(Math.random() * 100) + 1).toString();
    this.dispatchEvent(
      new CustomEvent("source-changed", {
        bubbles: true,
        composed: true,
      })
    );
  }

  /**
   * **Example for Public Method/Function**
   *
   * Logs the value of the 'source' property to the console.
   *
   * @param {}
   * @return {}
   */
  logSource() {
    console.log(this.source);
  }

  /**
   * Renders the HTML content for the component.
   * <script></script> tag will not be rendered
   *
   * @return {html} The rendered HTML content.
   */
  render() {
    return html`<div>
      <ptcs-button
        label="Change Source"
        icon=${this.getAssetPath("temp.png")}
        @click=${this.sourceClicked}
      ></ptcs-button>
      <cadit-element-template></cadit-element-template>
      <div>${`Source: ${this.source}`}</div>
      <div>${`Target: ${this.target}`}</div>
    </div>`;
  }
}

// @ts-ignore
customElements.define(WidgetTemplate.is, WidgetTemplate);