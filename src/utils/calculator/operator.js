// Constants
const ARITY_UNARY = 1;
const ARITY_BINARY = 2;
const ASSOCIATIVITY_NONE = 1;
const ASSOCIATIVITY_LEFT = 2;

class Operator {
  constructor(arity, associativity, precedence, numOperands, evaluate) {
    this.Arity = arity;
    this.Associativity = associativity;
    this.Precedence = precedence;
    this.NumOperands = numOperands;
    this.evaluate = evaluate;
  }

  // Returns true if precedence is higher than given operator
  isHigherPrecedence = operator => {
    if (this.Precedence === operator.Precedence)
      return this.Associativity === ASSOCIATIVITY_LEFT;
    return this.Precedence > operator.Precedence;
  };
}

/*
 * Define Operators:
 * Addition, Subtraction, Multiplication, Division, Percent, Negate
 */
const AdditionOperator = new Operator(
  ARITY_BINARY,
  ASSOCIATIVITY_LEFT,
  2,
  2,
  sy => {
    const op1 = sy.popOperand();
    const op2 = sy.popOperand();
    return op1 + op2;
  },
);

const SubtractionOperator = new Operator(
  ARITY_BINARY,
  ASSOCIATIVITY_LEFT,
  2,
  2,
  sy => {
    const op1 = sy.popOperand();
    const op2 = sy.popOperand();
    return op2 - op1;
  },
);

const MultiplicationOperator = new Operator(
  ARITY_BINARY,
  ASSOCIATIVITY_LEFT,
  3,
  2,
  function(sy) {
    const op1 = sy.popOperand();
    const op2 = sy.popOperand();
    return op1 * op2;
  },
);

const DivisionOperator = new Operator(
  ARITY_BINARY,
  ASSOCIATIVITY_LEFT,
  3,
  2,
  sy => {
    const op1 = sy.popOperand();
    const op2 = sy.popOperand();
    return op2 / op1;
  },
);

const PercentOperator = new Operator(
  ARITY_UNARY,
  ASSOCIATIVITY_NONE,
  0,
  1,
  sy => sy.popOperand() / 100.0,
);

const NegateOperator = new Operator(
  ARITY_UNARY,
  ASSOCIATIVITY_NONE,
  0,
  1,
  sy => {
    const op = sy.popOperand();
    return -1.0 * op;
  },
);

export {
  PercentOperator,
  NegateOperator,
  AdditionOperator,
  SubtractionOperator,
  MultiplicationOperator,
  DivisionOperator,
};
