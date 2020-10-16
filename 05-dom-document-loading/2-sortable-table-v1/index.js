export default class SortableTable {

  element;
  subElements;

  constructor(header = [], {data = []} = {}) {
    this.header = header;
    this.data = data;

    this.render();
  }

  sort(fieldValue, orderValue) {
    const sortedData = this.sortData(fieldValue, orderValue);
    this.subElements.body.innerHTML = this.getTable(sortedData);
  }

  sortData(field, order) {
    const sortTable = [...this.data];
    const currentHeaderItem = this.header.find(item => item.id === field);
    const sortType = currentHeaderItem ? currentHeaderItem.sortType : '';

    sortTable.sort((item1, item2) => {
      const a = item1[field];
      const b = item2[field];
      const c = (order === 'desc') ? -1 : 1;

      switch (sortType) {
      case 'number':
        return c * (a - b);
        // break;
      case 'string':
        return c * a.localeCompare(b, ['ru', 'en'], {caseFirst: 'upper'});
        // break;
      default:
        console.error(1111);
        break;
      }
      // return res;
    });
    return sortTable;
  }

  getTable (products) {
    const table = [];
    for (let product of products) {
      table.push(this.createDataRow(product));
    }
    return table.join('');
  }

  createHeaderRowColumn({id, title, order}) {
    return `
        <div class="sortable-table__cell" data-id="${id}" data-sortable="false" data-order="${order}">
            <span>${title}</span>
            <span data-element="arrow" class="sortable-table__sort-arrow">
                <span class="sort-arrow"></span>
            </span>
        </div>
    `;
  }

  createHeaderRow() {
    return `
        <div data-element="header" class="sortable-table__header sortable-table__row">
            ${this.header.map((value) => this.createHeaderRowColumn({ value })).join('')}
        </div>
    `;
  }

  createDataRow(colInfo) {
    return `
        <a href="" class="sortable-table__row">
            <div class="sortable-table__cell">
                <img class="sortable-table-image" alt="Image" src="${colInfo.images[0].url}">
            </div>
            <div class="sortable-table__cell">${colInfo.title}</div>
            <div class="sortable-table__cell">${colInfo.quantity}</div>
            <div class="sortable-table__cell">${colInfo.price}</div>
            <div class="sortable-table__cell">${colInfo.sales}</div>
        </a>
    `;
  }

  createTable() {
    return `
      <div class="sortable-table">
        ${this.createHeaderRow()}
        <div data-element="body" class="sortable-table__body">
            ${this.data.map((colInfo) => this.createDataRow(colInfo)).join('')}
        </div>
      </div>
    `;

  }

  getSubElements(element) {
    const elements = element.querySelectorAll('[data-element]');

    return [...elements].reduce((acc, item) => {
      acc[item.dataset.element] = item;
      return acc;
    }, {});
  }

  render() {
    const element = document.createElement('div');
    element.innerHTML = this.createTable();
    this.element = element.firstElementChild;
    this.subElements = this.getSubElements(this.element);
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }

}

