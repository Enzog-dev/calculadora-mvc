class CalculatorController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.view.bindButtonClick(this.handleButtonClick.bind(this));
    this.view.updateDisplay(this.model.getDisplayValue());
    this.view.updateHistory(this.model.getHistoryValue());
  }

  handleButtonClick({ value, action }) {
    if (action === 'clear') {
      this.model.reset();
    } else if (action === 'equals') {
      this.model.equals();
    } else if (action === 'operator') {
      this.model.setOperator(value);
    } else if (value === '.') {
      this.model.inputDecimal();
    } else if (value !== undefined) {
      this.model.inputDigit(value);
    }

    this.view.updateDisplay(this.model.getDisplayValue());
    this.view.updateHistory(this.model.getHistoryValue());
  }
}
