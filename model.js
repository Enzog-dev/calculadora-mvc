
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
            this.currentValue = this.currentValue === '0'
                ? digit
                : this.currentValue + digit;
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

    setOperator(operator) {
        if (this.error) return;

        const inputValue = parseFloat(this.currentValue);

        if (this.operator && !this.waitingForNewValue) {
            this.compute();
            if (this.error) return;
        }

        this.previousValue = parseFloat(this.currentValue);
        this.operator = operator;
        this.waitingForNewValue = true;
        this.historyExpression = `${this.formatResult(this.previousValue)} ${operator}`;
    }

    equals() {
        if (!this.operator || this.waitingForNewValue || this.error) return;

        const firstValue = this.previousValue;
        const secondValue = parseFloat(this.currentValue);
        const operator = this.operator;

        this.historyExpression = `${this.formatResult(firstValue)} ${operator} ${this.formatResult(secondValue)} =`;
        this.compute();
        this.operator = null;
        this.previousValue = null;
        this.waitingForNewValue = true;
    }

    getDisplayValue() {
        return this.error ? 'Erro' : this.currentValue;
    }

    getHistoryValue() {
        return this.historyExpression;
    }

    compute() {
        const firstValue = this.previousValue;
        const secondValue = parseFloat(this.currentValue);
        let result;

        switch (this.operator) {
            case '+':
                result = firstValue + secondValue;
                break;
            case '-':
                result = firstValue - secondValue;
                break;
            case '*':
            case '×':
                result = firstValue * secondValue;
                break;
            case '/':
            case '÷':
                if (secondValue === 0) {
                    this.setError();
                    return;
                }
                result = firstValue / secondValue;
                break;
            default:
                return;
        }

        if (!Number.isFinite(result)) {
            this.setError();
            return;
        }

        this.currentValue = this.formatResult(result);
    }

    isInvalid() {
        return this.error;
    }

    setError() {
        this.currentValue = 'Erro';
        this.error = true;
        this.operator = null;
        this.previousValue = null;
        this.waitingForNewValue = true;
    }

    formatResult(number) {
        return String(Number(number.toFixed(10)));
    }
}
