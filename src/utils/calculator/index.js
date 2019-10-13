import * as Operator from './operator';
import Memory from './memory';
import MainDisplay from './mainDisplay';

// Constants...
const STATE_AWAITING_OPERATOR = 0;
const STATE_ENTERING_OPERAND = 1;
const STATE_ENTERING_OPERATOR = 2;

export default class Calculator {
  constructor() {
    this._state = 0; // STATE_AWAITING_OPERATOR
    this._memory = new Memory();
    this._mainDisplay = new MainDisplay();
  }

  // Sets the current state of the calculator.
  setState = state => {
    this._state = state;
  };

  // Pushes the value of _mainDisplay onto the operand stack.
  pushDisplay = () => {
    const val = this._mainDisplay.getDisplayValue();
    this._memory.addOperand(val);
  };

  // Adds the given digit, or starts the display over if applicable.
  // Only send 0...9 or . (decimal). Must be a string. State dependent.
  addDigit = digit => {
    if (this._state === STATE_AWAITING_OPERATOR) {
      this._mainDisplay.clear();
      this._mainDisplay.addDigit(digit);
      this.setState(STATE_ENTERING_OPERAND);
    } else if (this._state === STATE_ENTERING_OPERAND) {
      this._mainDisplay.addDigit(digit);
      this.setState(STATE_ENTERING_OPERAND);
    } else if (this._state === STATE_ENTERING_OPERATOR) {
      this._mainDisplay.clear();
      this._mainDisplay.addDigit(digit);
      this.setState(STATE_ENTERING_OPERAND);
    }
  };

  // Removes the last character if applicable. State dependent.
  backspace = () => {
    if (this._state === STATE_AWAITING_OPERATOR) {
      this.setState(STATE_AWAITING_OPERATOR);
    } else if (this._state === STATE_ENTERING_OPERAND) {
      this._mainDisplay.backspace();
      this.setState(STATE_ENTERING_OPERAND);
    } else if (this._state === STATE_ENTERING_OPERATOR) {
      this.setState(STATE_ENTERING_OPERATOR);
    }
  };

  // All Clear will clear everything and returns to initial state
  clear = isAllClear => {
    this._mainDisplay.clear();
    if (isAllClear) {
      this._memory.clear();
      this.setState(STATE_AWAITING_OPERATOR);
    }
  };

  // Pushes display, evaluates, and updates display.
  equalsPressed = () => {
    this.pushDisplay();
    const result = this._memory.evaluate();
    this._mainDisplay.setDisplayValue(result);
    this.setState(STATE_AWAITING_OPERATOR);
  };

  // Negation is a special type of unary operator because the user must be allowed to continue typing the number.
  negate = () => {
    if (this._state === STATE_AWAITING_OPERATOR) {
      this.addUnaryOperator(Operator.NegateOperator);
    } else if (this._state === STATE_ENTERING_OPERAND) {
      this._mainDisplay.negate();
      this.setState(STATE_ENTERING_OPERAND);
    } else if (this._state === STATE_ENTERING_OPERATOR) {
      this.addUnaryOperator(Operator.NegateOperator);
    }
  };

  // Adds the given unary operator.
  addUnaryOperator = unaryOperator => {
    this.pushDisplay();
    this._memory.addUnaryOperator(unaryOperator);
    this._mainDisplay.setDisplayValue(this._memory.popOperand());
    this.setState(STATE_AWAITING_OPERATOR);
  };

  // Adds the given binary operator.
  addBinaryOperator = binaryOperator => {
    if (this._state === STATE_AWAITING_OPERATOR) {
      this.pushDisplay();
      this._memory.addBinaryOperator(binaryOperator);
      this._mainDisplay.setDisplayValue(this._memory.peekOperand());
      this.setState(STATE_ENTERING_OPERATOR);
    } else if (this._state === STATE_ENTERING_OPERAND) {
      this.pushDisplay();
      this._memory.addBinaryOperator(binaryOperator);
      this._mainDisplay.setDisplayValue(this._memory.peekOperand());
      this.setState(STATE_ENTERING_OPERATOR);
    } else if (this._state === STATE_ENTERING_OPERATOR) {
      // If entering an operator, we must have already had one, so we can pop...
      this._memory.popOperator();
      this._memory.addBinaryOperator(binaryOperator);
      this._mainDisplay.setDisplayValue(this._memory.peekOperand());
      this.setState(STATE_ENTERING_OPERATOR);
    }
  };

  // Returns the current display on the _mainDisplay.
  getMainDisplay = () => this._mainDisplay.getCurrentDisplay();
}
