const groupDigits = function(number) {
  let parts = number.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
};

export default class MainDisplay {
  constructor() {
    this._display = '0';
    this._maxLength = 9;
  }

  getCurrentDisplay = () => groupDigits(this._display);

  addDigit = digit => {
    if (this._display.length >= this._maxLength) return;
    if (digit === '.' && this._display.indexOf('.') >= 0) return;
    if (digit !== '.' && this._display === '0') this._display = '';

    this._display += digit;
  };

  negate = () => {
    const fChar = this._display.charAt(0);
    this._display =
      fChar === '-' ? this._display.substring(1) : '-' + this._display;
  };

  backspace = () => {
    const len = this._display.length;
    if (len === 1) this._display = '0';
    else if (len === 2 && this._display.charAt(0) === '-') this._display = '0';
    else this._display = this._display.substring(0, len - 1);
  };

  clear = () => {
    this._display = '0';
  };

  getDisplayValue = () => parseFloat(this._display);

  setDisplayValue = val => {
    // TODO: May need to do some formatting/rounding...
    this._display = val.toString();
  };
}
