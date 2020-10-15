export default class SortableTable {

  element;

  constructor(header = [], {data = []} = {}) {
    this.header = header;
    this.data = data;

    this.render();
  }

  sort(fieldValue, orderValue) {
    const sortedData = this.sortData(fieldValue, orderValue);

    this.remove();
    const e = new SortableTable(this.header, { sortedData });
    document.body.append(e.element);
  }

  sortData(fieldValue, orderValue) {
    switch (fieldValue) {
    case 'title': {
      const collator = new Intl.Collator('ru', {caseFirst: "upper"});
      if (orderValue === 'asc') {
        return this.data.sort((a, b) => collator.compare(a[fieldValue], b[fieldValue]));
      } else if (orderValue === 'desc') {
        return this.data.sort((a, b) => collator.compare(b[fieldValue], a[fieldValue]));
      }
    }
    case 'quantity':
    case 'price':
    case 'sales': {
      const sorting = orderValue === 'asc' ? 1 : -1;
      return this.data.sort((a, b) => sorting * (a[fieldValue] - b[fieldValue]));
    }
    default:
      return this.data;
    }
  }

  createHeaderRowColumn(id, title, order) {
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
            ${this.header.map((value) => this.createHeaderRowColumn(value.id, value.title, value.order)).join('\n')}
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
        ${this.data.map((colInfo) => this.createDataRow(colInfo)).join('\n')}
      </div>
    `;

  }

  render() {
    const element = document.createElement('div');
    element.innerHTML = this.createTable();
    this.element = element.firstElementChild;
    return element;
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }

}

