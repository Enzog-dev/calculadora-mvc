class CalculatorView {
  constructor() {
    this.displayElement = document.querySelector('[data-display]');
    this.historyElement = document.querySelector('[data-display-history]');
    this.buttons = document.querySelectorAll('[data-value], [data-action]');
  }

  updateDisplay(value) {
    if (this.displayElement) {
      if (this.displayElement.tagName === 'INPUT') {
        this.displayElement.value = value;
      } else {
        this.displayElement.textContent = value;
      }
    }
  }

  updateHistory(value) {
    if (this.historyElement) {
      this.historyElement.textContent = value || '';
    }
  }

  bindButtonClick(handler) {
    this.buttons.forEach((button) => {
      button.addEventListener('click', () => {
        handler({
          value: button.dataset.value,
          action: button.dataset.action,
        });
      });
    });
  }
}
