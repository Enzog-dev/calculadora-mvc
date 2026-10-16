
class CalculatorController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.view.bindButtonClick((value, action) => {
            this.handleButtonClick(value, action);
        });

        this.updateDisplay();
    }

    handleButtonClick(value, action) {
        if (action === 'clear') {
            this.model.reset();
        } else if (action === 'equals') {
            this.model.equals();
        } else if (value === '.') {
            this.model.inputDecimal();
        } else if (['+', '-', '*', '/', '×', '÷'].includes(value)) {
            this.model.setOperator(value);
        } else if (value !== undefined) {
            this.model.inputDigit(value);
        }

        this.updateDisplay();
    }

    updateDisplay() {
        this.view.updateDisplay(this.model.getDisplayValue());
        this.view.updateHistory(this.model.getHistoryValue());
    }
}
