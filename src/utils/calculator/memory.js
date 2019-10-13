export default class Memory {
  constructor() {
    this._operands = [];
    this._operators = [];
    this._actionBuffer = [];
  }

  peekOperand = () => {
    const len = this._operands.length;
    return len !== 0 ? this._operands[len - 1] : 0.0;
  };

  popOperand = () => (this._operands.length !== 0 ? this._operands.pop() : 0.0);

  numOperands = () => this._operands.length;

  popOperator = () => this._actionBuffer.pop();

  numOperators = () => this._actionBuffer.length;

  clear = () => {
    this._operands.length = 0;
    this._operators.length = 0;
    this._actionBuffer.length = 0;
  };

  evaluate = () => {
    const lastAction = this._actionBuffer[this._actionBuffer.length - 1];
    const lastOperand = this._operands[this._operands.length - 1];

    // Push all _actionBuffer to _operators...
    for (let i = 0; i < this._actionBuffer.length; i++)
      this._operators.push(this._actionBuffer[i]);

    this._actionBuffer.length = 0;

    // Evaluate all _operators...
    while (this._operators.length > 0) {
      const operator = this._operators.pop();
      this.applyOperator(operator);
    }

    // Check for errors and return result...
    if (this._operands.length !== 1)
      console.error('Invalid operand length (' + this._operands.length + ')');

    const result = this._operands.pop();

    // Keep last action and operand to same Calculator IOS
    this._actionBuffer.push(lastAction);
    this._operands.push(lastOperand);

    return result;
  };

  // Evaluates the given operator and adds result to _operands.
  applyOperator = operator => {
    const val = operator.evaluate(this);
    this.addOperand(val);
  };

  // Adds an operand to the stack.
  addOperand = operand => {
    this._operands.push(operand);
  };

  // Evaluates the UnaryOperator and pushes result to stack.
  addUnaryOperator = operator => {
    this.applyOperator(operator);
  };

  // First adds operator to _actionBuffer before committing to anything.
  addBinaryOperator = operator => {
    // If not parenthesis, perform precedence checks as usual...
    while (this._actionBuffer.length > 0) {
      // If previous is not higher, exit...
      const abLen = this._actionBuffer.length;
      if (!this._actionBuffer[abLen - 1].isHigherPrecedence(operator)) break;

      const prevOperator = this._actionBuffer.pop();
      this.applyOperator(prevOperator);
    }

    this._actionBuffer.push(operator);
  };
}
