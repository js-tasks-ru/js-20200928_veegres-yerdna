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
    this.subElements.body.innerHTML = this.getTableRows(sortedData);
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

  getTableHeader() {
    return `<div data-element="header" class="sortable-table__header sortable-table__row">
      ${this.header.map(item => this.getHeaderRow(item)).join('')}
    </div>`;
  }

  getHeaderRow({id, title, sortable}) {
    return `
      <div class="sortable-table__cell" data-id="${id}" data-sortable="${sortable}">
        <span>${title}</span>
        ${this.getHeaderSortingArrow()}
      </div>
    `;
  }

  getHeaderSortingArrow() {
    return `
      <span data-element="arrow" class="sortable-table__sort-arrow">
        <span class="sort-arrow"></span>
      </span>`;
  }

  getTableBody() {
    return `
      <div data-element="body" class="sortable-table__body">
        ${this.getTableRows(this.data)}
      </div>`;
  }

  getTableRows(data) {
    return data.map(item => {
      return `
      <a href="/products/${item.id}" class="sortable-table__row">
        ${this.getTableRow(item)}
      </a>`;
    }).join('');
  }

  getTableRow(item) {
    const cells = this.header.map(({id, template}) => {
      return {
        id,
        template
      };
    });

    return cells.map(({id, template}) => {
      return template
        ? template(item[id])
        : `<div class="sortable-table__cell">${item[id]}</div>`;
    }).join('');
  }

  getTable() {
    return `
      <div class="sortable-table">
        ${this.getTableHeader()}
        ${this.getTableBody()}
      </div>`;
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
    element.innerHTML = this.getTable();
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

