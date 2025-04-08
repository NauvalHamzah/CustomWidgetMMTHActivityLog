/**
 * DESCRIPTION:
 * This is sample widget created as an example for Developing Custom Widget
 * --------------------------------------------------------------
 * [Revision] [Date] [Who] [What]
 * [DONE] [2023] [Saleh Zaidan] Initial creation of template
 * [DONE] [04 Jan 2023] [David Khowanto] Update dynamic import or lazy load library [this._import("")] and added descriptive comments
 * [DONE] [15 August 2024] [Ali Ilham] Combine with cli template 
 * [ON PROGRESS] [19 March 2025] [Nauval Hamzah] Start custom widget development
*/

/* DOCUMENTATION: https://lit.dev/docs/ */
/* do not edit import - START */
import { LitElement, html, css } from "lit";
import { PTCS } from "ptcs-library/library.js";
import { L2Pw } from "ptcs-library/library-lit";
/* do not edit import - END */

import { AccordionElement } from './cadit-mmth-activity-log-accordion.js';
// @ts-ignore
customElements.define(AccordionElement.is, AccordionElement);

import { TableElement } from './cadit-mmth-activity-log-table.js';
// @ts-ignore
customElements.define(TableElement.is, TableElement);

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
    .accordion-container {
      width: 100%;
      overflow: hidden;
    }

    .accordion-group {
      margin-bottom: 16px
    }

    .accordion-header {
      height: 44px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0px;
      cursor: pointer;
      border-radius: 8px;
      border: solid 0.5px;
      background-repeat: no-repeat;
      background-size: cover;
      margin-bottom: 20px;
    }

    .calendar-icon {
      width: 20px; 
      height: 20px; 
      vertical-align: middle; 
      margin: 0 15px 0 20px;
    }

    .header-date {
      color: white;
      font-size: 18px;
      flex-grow: 1;
    }

    .accordion-button {
      width: 30px;
      height: 30px;
      background: transparent;
      color: white;
      border: none;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      cursor: pointer;
      margin-left: auto;
    }

    .accordion-panel {
      height: 160px;
      display: flex;
      flex-direction: row;
      padding: 0px;
      background: transparent;
      justify-content: flex-start;
      align-items: flex-start;
      margin-top: 5px;
    }

    .container-activity-icon {
      width: 48px;
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .upper-container-activity-icon {
      height: 48px;
      align-items: center;
    }

    .lower-container-activity-icon {
      height: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }

    .lower-container-activity-icon-center {
      width: 2px;
      height: 100%;
      background-color: #414141;
      flex-shrink: 0;
    }
    
    .lower-container-activity-icon-side {
      flex-grow: 1;
      height: 100%;
    }

    .container-activity-info {
      width: 100%;
      background-color: #343434;
      border: solid 1px #414141;
      border-radius: 8px;
      margin-left: 16px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      color: white;
      padding-bottom: 10px;
    }

    .upper-container-activity-info {
      height: 40px;
      font-size: 16px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-left: 16px;
    }

    .project-label {
      margin-right: 8px; 
      background-color: #c0c0c0;
      padding: 5px;
      border-radius: 4px;
    }

    .YCS {
      background-color: #B786E4;   
    }

    .ASTL {
      background-color: #FD61B5;   
    }

    .AIF {
      background-color: #5AA999;   
    }

    .MRP {
      background-color: #FF6A42;   
    }

    .activity-label {
      margin-right: 8px; 
    }

    .lower-container-activity-info {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
    }

    .user-icon {
      width: 30px;
      margin: 5px 17px 5px 21px;
    }

    .user-info {
      width: 230px;
    }

    .activity-box {
      display: flex;
      flex-direction: row;
      flex-grow: 1;
      background-color: #262626;
      border: solid 1px #414141;
      border-radius: 6px;
      margin-right: 16px;
      font-size: 18px;
      padding: 10px;
    }

    .activity-item{
      color: #4ba7bf;
      margin-right: 24px;
      font-size: 18px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .activity-desc{
      font-size: 18px;
      display: flex;
      justify-content: center;
      align-items: center;
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
      allData: { type: Object },
      isTable: { type: Boolean },
      isAsc: { type: Boolean },
      dataPerPage: { type: Number },
      searchQuery: { type: String },
      selectedProject: { type: String }
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
   * Initializes a new instance of the class.
   *
   * @constructor
   */
  constructor() {
    super();
    this.allData = [];
    this.sortedData = [];
    this.isTable = false;
    this.isAsc = false;
    this.dataPerPage = 4;
    this.searchQuery = "";
    this.widgetTemplateIs = WidgetTemplate.is;
    this.selectedProject = "";
  }

  filterData() {
    const query = this.searchQuery.toLowerCase();
    return this.allData.filter(item => {
      const keysToSearch = ['dateString', 'project', 'activityDescFull', 'activityDesc', 'activityItem', 'activityTypeDesc', 'timeString', 'department', 'username'];
      const matchesSearchQuery = keysToSearch.some(key => item[key].toLowerCase().includes(query));
      
      const matchesProject = !this.selectedProject || item.project === this.selectedProject;
  
      return matchesSearchQuery && matchesProject;
    });
  }

  initialization(){
    const filteredData = this.filterData()

    this.isAsc ? this.sortedData = filteredData.sort((a, b) => a.timestamp - b.timestamp) :
    this.sortedData = filteredData.sort((a, b) => b.timestamp - a.timestamp);
    console.log(filteredData)
  }

  updateChildProperties() {
    const accordion = this.shadowRoot.querySelector('cadit-mmth-activity-log-accordion');
    const table = this.shadowRoot.querySelector('cadit-mmth-activity-log-accordion')
    if (accordion || table) {
      accordion.sortedData = this.sortedData;
      table.sortedData = this.sortedData;
    }
  }

  handleSearchQueryChange(event) {
    this.searchQuery = event.target.value; // Update search query
  }

  /**
   * Renders the HTML content for the component.
   * <script></script> tag will not be rendered
   *
   * @return {html} The rendered HTML content.
   */
  render() {
    this.initialization()
    this.updateChildProperties()
    return html`
      ${this.isTable?  
        html`<cadit-mmth-activity-log-table 
                part="inner-table" exportparts="table-container:table-container"
                .sortedData=${this.sortedData} 
                .dataPerPage=${this.dataPerPage} 
                .searchQuery=${this.searchQuery}
                .selectedProject=${this.selectedProject}
                .widgetTemplateIs=${this.widgetTemplateIs}
                .tableMaxHeight=${this.tableMaxHeight}>
             </cadit-mmth-activity-log-table>` :
        html`<cadit-mmth-activity-log-accordion 
                .sortedData=${this.sortedData}
                .searchQuery=${this.searchQuery}                
                .widgetTemplateIs=${this.widgetTemplateIs}>
             </cadit-mmth-activity-log-accordion>`
      }
    `;
  }
}

// @ts-ignore
customElements.define(WidgetTemplate.is, WidgetTemplate);