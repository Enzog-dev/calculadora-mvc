class CalculatorModel {
  constructor() {
    this.reset();
  }

  reset() {
    this.currentValue = '0';
    this.previousValue = null;
    this.operator = null;
    this.waitingForNewValue = false;
    this.error = false;
    this.historyExpression = '';
  }

  inputDigit(digit) {
    if (this.error) this.reset();

    if (this.waitingForNewValue) {
      this.currentValue = digit;
      this.waitingForNewValue = false;
    } else {
      this.currentValue = this.currentValue === '0' ? digit : this.currentValue + digit;
    }
  }

  inputDecimal() {
    if (this.error) this.reset();

    if (this.waitingForNewValue) {
      this.currentValue = '0.';
      this.waitingForNewValue = false;
      return;
    }
    if (!this.currentValue.includes('.')) {
      this.currentValue += '.';
    }
  }

  setOperator(nextOperator) {
    if (this.error) this.reset();

    const inputValue = parseFloat(this.currentValue);

    if (this.previousValue !== null && this.operator && !this.waitingForNewValue) {
      const result = this.compute();
      if (this.isInvalid(result)) {
        this.setError();
        return;
      }
      this.currentValue = this.formatResult(result);
      this.previousValue = result;
    } else {
      this.previousValue = inputValue;
    }

    this.waitingForNewValue = true;
    this.operator = nextOperator;
    this.historyExpression = `${this.previousValue} ${nextOperator}`;
  }

  equals() {
    if (this.error || this.operator === null) return;

    const prev = this.previousValue;
    const current = parseFloat(this.currentValue);
    const op = this.operator;

    const result = this.compute();
    if (this.isInvalid(result)) {
      this.setError();
      return;
    }

    this.historyExpression = `${prev} ${op} ${current} =`;
    this.currentValue = this.formatResult(result);
    this.previousValue = null;
    this.operator = null;
    this.waitingForNewValue = true;
  }

  getDisplayValue() {
    return this.error ? 'Erro' : this.currentValue;
  }

  getHistoryValue() {
    return this.error ? '' : this.historyExpression;
  }

  compute() {
    const prev = this.previousValue;
    const current = parseFloat(this.currentValue);

    switch (this.operator) {
      case '+': return prev + current;
      case '-': return prev - current;
      case '×':
      case '*': return prev * current;
      case '÷':
      case '/': return current === 0 ? NaN : prev / current;
      default: return current;
    }
  }

  isInvalid(result) {
    return Number.isNaN(result) || !Number.isFinite(result);
  }

  setError() {
    this.error = true;
    this.previousValue = null;
    this.operator = null;
    this.historyExpression = '';
    this.waitingForNewValue = true;
  }

  formatResult(result) {
    const rounded = Math.round(result * 1e10) / 1e10;
    return String(rounded);
  }
}
