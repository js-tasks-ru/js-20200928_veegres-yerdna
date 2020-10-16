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

  getTable(products) {
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

  createHeaderRow(arr, field = 'title', order = '') {
    return arr.map(({title, id, sortable}) => {
      return `
        <div class="sortable-table__cell" data-id="${id}" data-sortable="${sortable}" data-order="${field === id ? order : ''}">
          <span>${title} ${field === id ? order : ''}</span>
           <span class="sortable-table__sort-arrow">
            <span class="sort-arrow"/>
          </span>
        </div>`;
    }).join('');
  }


  createDataRow({title = '', images = [], quantity = 0, price = 0, sales = 0} = {}) {
    const image = (images.length > 0) ? `<img class="sortable-table-image" alt="Image" src="${images[0].url}">` : '';
    return `
      <a href="/products/3d-ochki-epson-elpgs03" class="sortable-table__row">
        <div class="sortable-table__cell">${image}</div>
        <div class="sortable-table__cell">${title}</div>
        <div class="sortable-table__cell">${quantity}</div>
        <div class="sortable-table__cell">${price}</div>
        <div class="sortable-table__cell">${sales}</div>
      </a>`;
  }

  createTable() {
    return `
      <div class="sortable-table">
         <div data-element="header" class="sortable-table__header sortable-table__row">
            ${this.createHeaderRow(this.header)}
        </div>
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

