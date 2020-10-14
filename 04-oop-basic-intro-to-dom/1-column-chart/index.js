export default class ColumnChart {

  constructor({data = [], label = '', link = '', value = 0} = {}) {
    this.data = data;
    this.label = label;
    this.link = link;
    this.value = value;
    this.chartHeight = 50;
    this.render();
  }

  render() {
    const element = document.createElement('div');

    element.innerHTML = this.getTemplate();
    this.element = element.firstElementChild;

    if (this.data.length) {
      this.element.classList.remove('column-chart_loading');
    }
  }

  getTemplate() {
    return `
      <div class="column-chart column-chart_loading" style="--chart-height: ${this.chartHeight}">
        <div class="column-chart__title">
          Total ${this.label}
          ${this.getLink()}
        </div>
        <div class="column-chart__container">
          <div data-element="header" class="column-chart__header">
            ${this.value}
          </div>
          <div data-element="body" class="column-chart__chart">
            ${this.getColumn(this.data)}
          </div>
        </div>
      </div>
    `;
  }

  getColumn(data) {
    const maxValue = Math.max(...data);
    return data.map(item => {
      const percent = Math.round(item / maxValue * 100);
      return `<div style="--value: ${Math.floor(item * this.chartHeight / maxValue)}" data-tooltip="${percent}%"></div>`;
    }).join('');
  }

  getLink() {
    if (this.link) {
      return `<a class="column-chart__link" href="${this.link}">View all</a>`;
    } else {
      return '';
    }
  }

  update(data = []) {
    this.data = data;
    this.render();
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }

}
