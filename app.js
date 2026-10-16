document.addEventListener('DOMContentLoaded', () => {
  const model = new CalculatorModel();
  const view = new CalculatorView();
  new CalculatorController(model, view);
});
