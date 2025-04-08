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


export class AccordionElement extends PTCS.BehaviorTabindex(
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
      sortedData: { type: Object },
      searchQuery: { type: String },
      widgetTemplateIs: { type: String }  
    };
  }

  /**
   * Returns the web component name of the widget.
   *
   * @return {string} The web component name of the widget.
   */
  static get is() {
    return "cadit-mmth-activity-log-accordion";
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
    return `../extensions/${this.widgetTemplateIs}/assets/${filename}`;
  }

   /**
   * Initializes a new instance of the class.
   *
   * @constructor
   */
  constructor() {
    super();
    this.sortedData = [];
    this.dataPerDay = [];
    this.searchQuery = "";
    this.widgetTemplateIs = "";
  }

  initialization() {
    let dayList = []
    this.dataPerDay = []
    for (let i = 0; i < this.sortedData.length; i++) {
      const { dateString } = this.sortedData[i];
      if (!dayList.includes(dateString)) {
        dayList.push(dateString);
      }
    }

    for (let i = 0; i < dayList.length; i++) {
      let groupedData ={
        dayString: dayList[i],
        panelData: this.sortedData.filter(item => item.dateString === dayList[i])
      }
      this.dataPerDay.push(groupedData)
    }

    this.requestUpdate()

    this.shadowRoot.querySelectorAll(".accordion-panel").forEach((panel) => {
      panel.style.display = "flex";
    });  
  } 

  toggleAccordion(event) {
    const button = event.target;
    const group = button.closest(".accordion-group"); 
    const panels = group.querySelectorAll(".accordion-panel"); 
  
    const isOpen = [...panels].some(panel => panel.style.display !== "none");
  
    panels.forEach(panel => {
      panel.style.display = isOpen ? "none" : "flex";
    });
  
    button.innerHTML = isOpen ? "&#10095;" : "&#10094;";
  }

  updated(changedProperties) {
    if (changedProperties.has('searchQuery')) {
      console.log(this.searchQuery)
      this.requestUpdate()
    }
  }
  

  /**
   * Renders the HTML content for the component.
   * <script></script> tag will not be rendered
   *
   * @return {html} The rendered HTML content.
   */
  render() {
    this.initialization()
    return html`
      <div class="accordion-container">
        ${this.dataPerDay.map(
          (item) => html`
            <div class="accordion-group">
              <div class="accordion-header" style="background-image: url('${this.getAssetPath("header-image-primary-wider.png")}');">
                <img class="calendar-icon" src='${this.getAssetPath("MMTH.SCM.UI.CalendarIcon.PNG")}'/>
                <span class="header-date">${item.dayString}</span>
                <button class="accordion-button" @click="${this.toggleAccordion}">
                  &#10094
                </button>
              </div>
              ${item.panelData.map((panel) => html`
                <div class="accordion-panel">
                  <div class="container-activity-icon">
                    <div class="upper-container-activity-icon">
                        <img class="activity-icon" src='${this.getAssetPath(panel.activityIcon+".PNG")}' />
                    </div>
                    <div class="lower-container-activity-icon">
                        <div class="lower-container-activity-icon-side"></div>
                        <div class="lower-container-activity-icon-center"></div>
                        <div class="lower-container-activity-icon-side"></div>
                    </div>
                  </div>
                  <div class="container-activity-info">
                    <div class="upper-container-activity-info">
                      <span class="project-label ${panel.project}">${panel.project}</span>
                      <span class="activity-label"> • ${panel.activityType}</span>
                      <span> • ${panel.timeString}</span>
                    </div>
                    <div class="lower-container-activity-info">
                      <img class="user-icon" src='${this.getAssetPath("MMTH.SCM.UI.UserIcon.PNG")}'/>
                      <div class="user-info">
                        <h3>${panel.username}</h3>
                        <h3 style="color:#a8b2b9;">${panel.department}</h3>
                      </div>
                      <div class="activity-box">
                        <div class="activity-item">
                          <span>${panel.activityItem}</span>
                        </div>
                        <div class="activity-desc">
                          <span>${panel.activityDesc}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                `
              )}  
            </div>
          `
        )}
      </div>
    `;
  }
}
