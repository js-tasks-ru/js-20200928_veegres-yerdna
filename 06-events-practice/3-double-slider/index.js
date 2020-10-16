export default class DoubleSlider {

  element;

  constructor() {
    this.render();
  }

  render() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="range-slider">
            <span>$10</span>
            <div class="range-slider__inner">
                <span class="range-slider__progress" style="left: 0%; right: 0%"></span>
                <span class="range-slider__thumb-left" style="left: 0%"></span>
                <span class="range-slider__thumb-right" style="right: 0%"></span>
            </div>
            <span>$100</span>
        </div>
    `;
    const leftSlider = element.getElementsByClassName('range-slider__thumb-left')[0];
    const rightSlider = element.getElementsByClassName('range-slider__thumb-right')[0];
    leftSlider.addEventListener('mousedown', (event) => {

      //document.body.append(leftSlider);
      moveAt(event.pageX);

      function moveAt(pageX) {
        leftSlider.style.left = pageX - 1;
      }

      function onMouseMove(event) {
        moveAt(event.pageX);
      }

      document.addEventListener('mousemove', onMouseMove);

      leftSlider.addEventListener('mouseup', (event) => {
        document.removeEventListener('mousemove', onMouseMove);
      });
    });
    rightSlider.addEventListener('mousedown', () => alert("21"));
    this.element = element.firstElementChild;
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
  /*
    <div class="range-slider">
    <span>$10</span>
    <div class="range-slider__inner">
      <span class="range-slider__progress"></span>
      <span class="range-slider__thumb-left"></span>
      <span class="range-slider__thumb-right"></span>
    </div>
    <span>$100</span>
  </div>
   */
}
