
class CalculatorView {
    constructor() {
        this.displayElement = document.querySelector('[data-display]');
        this.historyElement = document.querySelector('[data-display-history]');
        this.buttons = document.querySelectorAll('[data-value], [data-action]');
    }

    updateDisplay(value) {
        this.displayElement.textContent = value;
    }

    updateHistory(value) {
        this.historyElement.textContent = value;
    }

    bindButtonClick(handler) {
        this.buttons.forEach(button => {
            button.addEventListener('click', () => {
                handler(button.dataset.value, button.dataset.action);
            });
        });
    }
}
