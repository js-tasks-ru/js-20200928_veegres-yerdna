export default class NotificationMessage {
  element;
  static showedElement;


  constructor(message = '', {duration = 0, type = ''} = {}) {
    this.message = message;
    this.duration = duration;
    this.type = type;

    if (NotificationMessage.showedElement) {
      NotificationMessage.showedElement.remove();
    }

    this.render();
  }

  show(toDocument = document.body) {
    toDocument.append(this.element);
    setTimeout(() => this.remove(), this.duration);
    return this.element;
  }

  render() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="notification ${this.type}" style="--value:${this.getSecDuration()}s">
            <div class="timer"></div>
            <div class="inner-wrapper">
            <div class="notification-header">${this.type}</div>
            <div class="notification-body">
                ${this.message}
            </div>
        </div>
    </div>
    `;
    this.element = element.firstElementChild;
    NotificationMessage.showedElement = this.element;
  }

  getSecDuration() {
    return this.duration / 1000;
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }

}
