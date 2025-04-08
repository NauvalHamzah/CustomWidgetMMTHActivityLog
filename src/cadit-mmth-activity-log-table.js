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


export class TableElement extends PTCS.BehaviorTabindex(
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
    :host {
      display: block;
    }
    .table-container {
      width: 100%;
      max-height: 85vh; 
      display: flex;
      flex-direction: column;
      overflow: hidden;
      border-radius: 8px;
    }
    .table-wrapper {
      flex-grow: 1; 
      overflow-y: auto;
    }
    thead {
      position: sticky;
      top: 0;
      z-index: 2;
      background-size: cover;
      background-position: center;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th, td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
      border-left: none;
      border-right: none;
      font-size: 16px;  
    }
    th {
      text-align: center;
      color: white;
      position: sticky;
      top: 0;
      z-index: 2
    }
    tbody tr:nth-child(even) {
      background-color: #fff ;
    }
    tbody tr:nth-child(odd) {
      background-color: #f0eded;
    }
    .table-footer {
      position: sticky;
      bottom: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 5px;
      background-color: #f4f4f4;
      width: 100%;
      height: 42px
    }
    .total-data {
      margin: 0 12px; 
      color: #2d2d2d; 
      font-size: 16px;
      width: 150px;
    }
    .footer-gap {
      width: 100%;
      height: 50%;
      align-self: flex-start;
      border-bottom: 1px solid #e1e1e2;
    }
    .pagination {
      display: flex;
      gap: 5px;
      width: 280px;
      height: 100%;
      margin: 5px;
      background-color: #f9f9f9;
      color: #232b2d;
    }
    .first-btn, .prev-btn, .next-btn, .last-btn {
      background: none;
      border: none;
      padding: 2px;
      cursor: pointer;
      margin: 2px;
      width: 24px;
    }

    .first-btn img, .prev-btn img, .next-btn img, .last-btn img {
      width: 18px;  
      height: 18px;
    }

    .first-btn:hover, .prev-btn:hover, .next-btn:hover, .last-btn:hover {
      background-color: #f0f0f0; 
      transform: scale(1.1); 
    }

    .first-btn:active, .prev-btn:active, .next-btn:active, .last-btn:active {
      background-color: #ccc;
      transform: scale(1);
    }

    .page-info {
      display: flex;
      align-items: center;
      width: 120px;
    }

    .current-page {
      width: 60px;
      text-align: center;
      border: 1px solid #c2c7ce;
      padding: 2px;
      font-size: 18px;
      -webkit-appearance: none; 
      -moz-appearance: textfield;  
      appearance: none;  
    }

    .current-page::-webkit-outer-spin-button,
    .current-page::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    .current-page[type="number"] {
      -moz-appearance: textfield;
    }

    .total-pages {
      font-size: 18px;
      margin-left: 5px;
      width: 100%;
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
      selectedProject: { type: String },
      widgetTemplateIs: { type: String },
      currentPage: { type: Number }
    };
  }

  /**
   * Returns the web component name of the widget.
   *
   * @return {string} The web component name of the widget.
   */
  static get is() {
    return "cadit-mmth-activity-log-table";
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
    this.totalData = 0;
    this.dataPerPage = 5;
    this.currentPage = 1;
    this.offset = 0;
    this.totalPage = 1;
    this.searchQuery = "";
    this.widgetTemplateIs = "";
  }

  initialization() {
    this.totalData = this.sortedData.length;
    this.totalPage = Math.ceil(this.totalData / this.dataPerPage);
    this.offset = (this.currentPage - 1) * this.dataPerPage;
  }

  handleBlur(event) {
    let value = event.target.value.trim();
    value = Number(value);

    if (value > this.totalPage) {
      value = this.totalPage;
    } else if (value < 1) {
      value = 1;
    }

    if (value < 10) {
      value = '0' + value;
    }

    event.target.value = value;

    this.currentPage = value;
  }


  handleKeyDown(event) {
    if (event.key === 'Enter') {
      this.shadowRoot.querySelector('.current-page').blur();
    }
  }

  firstPage(){
    this.currentPage = 1;
    const input = this.shadowRoot.querySelector('.current-page');
    if (input) {
      input.value = '01';
    }
    this.requestUpdate();
  }

  prevPage(){
    this.currentPage = Math.max(this.currentPage-1, 1);
    const input = this.shadowRoot.querySelector('.current-page');
    if (this.currentPage<10) {
      input.value = String(this.currentPage).padStart(2, '0');
    } else { input.value = String(this.currentPage) }
    this.requestUpdate();
  }

  nextPage(){
    this.currentPage = Math.min(this.currentPage+1, this.totalPage);
    const input = this.shadowRoot.querySelector('.current-page');
    if (this.currentPage<10) {
      input.value = String(this.currentPage).padStart(2, '0');
    } else { input.value = String(this.currentPage) }
    this.requestUpdate();
  }

  lastPage(){
    this.currentPage = this.totalPage;
    const input = this.shadowRoot.querySelector('.current-page');
    if (this.currentPage<10) {
      input.value = String(this.currentPage).padStart(2, '0');
    } else { input.value = String(this.currentPage) }
    this.requestUpdate();
  }

  formatTimestamp(timestamp) {
    const date = new Date(timestamp);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const milliseconds = String(date.getMilliseconds()).padStart(3, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
  }

  updated(changedProperties) {
    if (changedProperties.has('searchQuery') || changedProperties.has('selectedProject')) {
      this.firstPage();
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
    const paginatedData = this.sortedData.slice(this.offset, this.offset + this.dataPerPage);

    return html`
    <div class="table-container" part="table-container">
      <div class="table-wrapper">
        <table>
          <thead style="background-image: url('${this.getAssetPath("header-image-primary-wider.png")}')">
            <tr>
              <th></th>
              <th>id</th>
              <th>timestamp</th>
              <th>timeString</th>
              <th>dateString</th>
              <th>project</th>
              <th>activityDescType</th>
              <th>activityType</th>
              <th>activityItem</th>
              <th>activityDesc</th>
              <th>activityFullDesc</th>
              <th>username</th>
              <th>department</th>
              <th>activityIcon</th>
            </tr>
          </thead>
          <tbody>
            ${paginatedData.map((item, index) => html`
              <tr>
                <td>${this.offset + index + 1}</td>
                <td>${item.id}</td>
                <td>${this.formatTimestamp(item.timestamp)}</td>
                <td>${item.timeString}</td>
                <td>${item.dateString}</td>
                <td>${item.project}</td>
                <td>${item.activityTypeDesc}</td>
                <td>${item.activityType}</td>
                <td>${item.activityItem}</td>
                <td>${item.activityDesc}</td>
                <td>${item.activityDescFull}</td>
                <td>${item.username}</td>
                <td>${item.department}</td>
                <td><img src='${this.getAssetPath(item.activityIcon + ".PNG")}'/></td>
              </tr>
            `)}
          </tbody>
        </table>
      </div>
      
      <div class="table-footer">
        <div class="total-data"><b>Total Rows: ${this.totalData}</b></div>
        <div class="footer-gap"></div>
        <div class="pagination">
          <button class="first-btn" @click=${this.firstPage}>
            <img src='${this.getAssetPath("FirstPageDark.PNG")}' alt="First">
          </button>
          <button class="prev-btn" @click=${this.prevPage}>
            <img src='${this.getAssetPath("PrevPageDark.PNG")}' alt="Previous">
          </button>
          <div class="page-info">
            <input 
              type="number"
              class="current-page"
              .value="${String(this.currentPage).padStart(2, '0')}"
              @blur="${this.handleBlur}"
              @keydown="${this.handleKeyDown}"
              min="1"
              max="${this.totalPage}"
            > 
            <span class="total-pages">/ ${this.totalPage < 10 ? "0" + this.totalPage : this.totalPage}</span> 
          </div>
          <button class="next-btn" @click=${this.nextPage}>
            <img src='${this.getAssetPath("NextPageDark.PNG")}' alt="Next">
          </button>
          <button class="last-btn" @click=${this.lastPage}>
            <img src='${this.getAssetPath("LastPageDark.PNG")}' alt="Last">
          </button>
        </div>
      </div>
    </div>
    `;
  }
}
