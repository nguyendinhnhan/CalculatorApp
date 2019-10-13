import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  StatusBar,
  View,
  Text,
  PanResponder,
} from 'react-native';

import {CalculatorButton} from './components';
import Colors from './constants/Colors';
import {BUTTON_TYPE} from './constants/AppConstants';
import * as Operator from './utils/calculator/operator';
import Calculator from './utils/calculator';
import {getStyleForOrientation, ThemeOfCalcBtn} from './utils/helper';

const PADDING_KEYBOARD = 5;

// Initialize calculator...
const calc = new Calculator();

// Get style for calc btn
let orientationStyle = getStyleForOrientation(PADDING_KEYBOARD * 2);
const theme = ThemeOfCalcBtn;

const App = () => {
  const [display, setDisplay] = useState('0');
  const [orientation, setOrientation] = useState('portrait');
  const [operatorHighlight, setOperatorHighlight] = useState('');
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
    onMoveShouldSetPanResponder: (evt, gestureState) => true,
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
    onPanResponderMove: (evt, gestureState) => {},
    onPanResponderRelease: (evt, gestureState) => {
      if (Math.abs(gestureState.dx) >= 50) {
        handleTap(BUTTON_TYPE.BACKSPACE);
      }
    },
  });

  // Listen for orientation changes...
  Dimensions.addEventListener('change', () => {
    const {width, height} = Dimensions.get('window');
    orientationStyle = getStyleForOrientation(PADDING_KEYBOARD * 2);
    setOrientation(width > height ? 'landscape' : 'portrait');
  });

  const handleTap = (type, param) => {
    switch (type) {
      case BUTTON_TYPE.DIGIT:
        calc.addDigit(param);
        break;
      case BUTTON_TYPE.PERCENT:
        calc.addUnaryOperator(param);
        break;
      case BUTTON_TYPE.OPERATOR:
        calc.addBinaryOperator(param);
        break;
      case BUTTON_TYPE.EQUALS:
        calc.equalsPressed();
        break;
      case BUTTON_TYPE.CLEAR:
        calc.clear(param);
        break;
      case BUTTON_TYPE.PLUS_MINUS:
        calc.negate();
        break;
      case BUTTON_TYPE.BACKSPACE:
        calc.backspace();
        break;
      default:
        break;
    }
    if (type !== BUTTON_TYPE.OPERATOR) setOperatorHighlight('');
    setDisplay(calc.getMainDisplay());
  };

  const renderMainKeyboard = () => {
    return (
      <View style={styles.mainKeyboardContainer}>
        <View style={styles.keyboardRow}>
          <CalculatorButton
            title={display === '0' ? 'AC' : 'C'}
            customStyle={{...theme.unaryOperator, ...orientationStyle.calcBtn}}
            onPress={() => handleTap(BUTTON_TYPE.CLEAR, display === '0')}
          />
          <CalculatorButton
            title="+/-"
            customStyle={{...theme.unaryOperator, ...orientationStyle.calcBtn}}
            onPress={() => handleTap(BUTTON_TYPE.PLUS_MINUS)}
          />
          <CalculatorButton
            title="%"
            customStyle={{...theme.unaryOperator, ...orientationStyle.calcBtn}}
            onPress={() => {
              handleTap(BUTTON_TYPE.PERCENT, Operator.PercentOperator);
            }}
          />
          <CalculatorButton
            title="/"
            customStyle={{
              ...(operatorHighlight === '/' && theme.operatorHighlight),
              ...orientationStyle.calcBtn,
            }}
            onPress={() => {
              handleTap(BUTTON_TYPE.OPERATOR, Operator.DivisionOperator);
              setOperatorHighlight('/');
            }}
          />
        </View>
        <View style={styles.keyboardRow}>
          <CalculatorButton
            title="7"
            customStyle={{...theme.digit, ...orientationStyle.calcBtn}}
            onPress={() => {
              handleTap(BUTTON_TYPE.DIGIT, '7');
            }}
          />
          <CalculatorButton
            title="8"
            customStyle={{...theme.digit, ...orientationStyle.calcBtn}}
            onPress={() => {
              handleTap(BUTTON_TYPE.DIGIT, '8');
            }}
          />
          <CalculatorButton
            title="9"
            customStyle={{...theme.digit, ...orientationStyle.calcBtn}}
            onPress={() => {
              handleTap(BUTTON_TYPE.DIGIT, '9');
            }}
          />
          <CalculatorButton
            title="x"
            customStyle={{
              ...(operatorHighlight === 'x' && theme.operatorHighlight),
              ...orientationStyle.calcBtn,
            }}
            onPress={() => {
              handleTap(BUTTON_TYPE.OPERATOR, Operator.MultiplicationOperator);
              setOperatorHighlight('x');
            }}
          />
        </View>
        <View style={styles.keyboardRow}>
          <CalculatorButton
            title="4"
            customStyle={{...theme.digit, ...orientationStyle.calcBtn}}
            onPress={() => {
              handleTap(BUTTON_TYPE.DIGIT, '4');
            }}
          />
          <CalculatorButton
            title="5"
            customStyle={{...theme.digit, ...orientationStyle.calcBtn}}
            onPress={() => {
              handleTap(BUTTON_TYPE.DIGIT, '5');
            }}
          />
          <CalculatorButton
            title="6"
            customStyle={{...theme.digit, ...orientationStyle.calcBtn}}
            onPress={() => {
              handleTap(BUTTON_TYPE.DIGIT, '6');
            }}
          />
          <CalculatorButton
            title="-"
            customStyle={{
              ...(operatorHighlight === '-' && theme.operatorHighlight),
              ...orientationStyle.calcBtn,
            }}
            onPress={() => {
              handleTap(BUTTON_TYPE.OPERATOR, Operator.SubtractionOperator);
              setOperatorHighlight('-');
            }}
          />
        </View>
        <View style={styles.keyboardRow}>
          <CalculatorButton
            title="1"
            customStyle={{...theme.digit, ...orientationStyle.calcBtn}}
            onPress={() => {
              handleTap(BUTTON_TYPE.DIGIT, '1');
            }}
          />
          <CalculatorButton
            title="2"
            customStyle={{...theme.digit, ...orientationStyle.calcBtn}}
            onPress={() => {
              handleTap(BUTTON_TYPE.DIGIT, '2');
            }}
          />
          <CalculatorButton
            title="3"
            customStyle={{...theme.digit, ...orientationStyle.calcBtn}}
            onPress={() => {
              handleTap(BUTTON_TYPE.DIGIT, '3');
            }}
          />
          <CalculatorButton
            title="+"
            customStyle={{
              ...(operatorHighlight === '+' && theme.operatorHighlight),
              ...orientationStyle.calcBtn,
            }}
            onPress={() => {
              handleTap(BUTTON_TYPE.OPERATOR, Operator.AdditionOperator);
              setOperatorHighlight('+');
            }}
          />
        </View>
        <View style={styles.keyboardRow}>
          <CalculatorButton
            title="0"
            customStyle={{...theme.digit, ...orientationStyle.calcBtn}}
            style={{...styles.buttonZero, ...orientationStyle.buttonZero}}
            onPress={() => {
              handleTap(BUTTON_TYPE.DIGIT, '0');
            }}
          />
          <CalculatorButton
            title="."
            customStyle={{...theme.digit, ...orientationStyle.calcBtn}}
            onPress={() => {
              handleTap(BUTTON_TYPE.DIGIT, '.');
            }}
          />
          <CalculatorButton
            title="="
            customStyle={{...theme.operator, ...orientationStyle.calcBtn}}
            onPress={() => handleTap(BUTTON_TYPE.EQUALS)}
          />
        </View>
      </View>
    );
  };

  const renderExtendKeyboard = () => (
    <View style={styles.extendKeyboardContainer}>
      <View style={styles.keyboardRow}>
        <CalculatorButton
          title="("
          customStyle={{...orientationStyle.calcBtn, ...theme.extend}}
        />
        <CalculatorButton
          title=")"
          customStyle={{...orientationStyle.calcBtn, ...theme.extend}}
        />
        <CalculatorButton
          title="mc"
          customStyle={{...orientationStyle.calcBtn, ...theme.extend}}
        />
        <CalculatorButton
          title="m+"
          customStyle={{...orientationStyle.calcBtn, ...theme.extend}}
        />
        <CalculatorButton
          title="m-"
          customStyle={{...orientationStyle.calcBtn, ...theme.extend}}
        />
        <CalculatorButton
          title="mr"
          customStyle={{...orientationStyle.calcBtn, ...theme.extend}}
        />
      </View>
      <View style={styles.keyboardRow}>
        <CalculatorButton
          title="2nd"
          customStyle={{...orientationStyle.calcBtn, ...theme.extend}}
        />
        <CalculatorButton
          title="x2"
          customStyle={{...orientationStyle.calcBtn, ...theme.extend}}
        />
        <CalculatorButton
          title="x3"
          customStyle={{...orientationStyle.calcBtn, ...theme.extend}}
        />
        <CalculatorButton
          title="xy"
          customStyle={{...orientationStyle.calcBtn, ...theme.extend}}
        />
        <CalculatorButton
          title="ex"
          customStyle={{...orientationStyle.calcBtn, ...theme.extend}}
        />
        <CalculatorButton
          title="10x"
          customStyle={{...orientationStyle.calcBtn, ...theme.extend}}
        />
      </View>
      <View style={styles.keyboardRow}>
        <CalculatorButton
          title="1/x"
          customStyle={{...orientationStyle.calcBtn, ...theme.extend}}
        />
        <CalculatorButton
          title="2x"
          customStyle={{...orientationStyle.calcBtn, ...theme.extend}}
        />
        <CalculatorButton
          title="3x"
          customStyle={{...orientationStyle.calcBtn, ...theme.extend}}
        />
        <CalculatorButton
          title="yx"
          customStyle={{...orientationStyle.calcBtn, ...theme.extend}}
        />
        <CalculatorButton
          title="In"
          customStyle={{...orientationStyle.calcBtn, ...theme.extend}}
        />
        <CalculatorButton
          title="log10"
          customStyle={{...orientationStyle.calcBtn, ...theme.extend}}
        />
      </View>
      <View style={styles.keyboardRow}>
        <CalculatorButton
          title="x!"
          customStyle={{...orientationStyle.calcBtn, ...theme.extend}}
        />
        <CalculatorButton
          title="sin"
          customStyle={{...orientationStyle.calcBtn, ...theme.extend}}
        />
        <CalculatorButton
          title="cos"
          customStyle={{...orientationStyle.calcBtn, ...theme.extend}}
        />
        <CalculatorButton
          title="tan"
          customStyle={{...orientationStyle.calcBtn, ...theme.extend}}
        />
        <CalculatorButton
          title="e"
          customStyle={{...orientationStyle.calcBtn, ...theme.extend}}
        />
        <CalculatorButton
          title="EE"
          customStyle={{...orientationStyle.calcBtn, ...theme.extend}}
        />
      </View>
      <View style={styles.keyboardRow}>
        <CalculatorButton
          title="Rad"
          customStyle={{...orientationStyle.calcBtn, ...theme.extend}}
        />
        <CalculatorButton
          title="sinh"
          customStyle={{...orientationStyle.calcBtn, ...theme.extend}}
        />
        <CalculatorButton
          title="cosh"
          customStyle={{...orientationStyle.calcBtn, ...theme.extend}}
        />
        <CalculatorButton
          title="tanh"
          customStyle={{...orientationStyle.calcBtn, ...theme.extend}}
        />
        <CalculatorButton
          title="n"
          customStyle={{...orientationStyle.calcBtn, ...theme.extend}}
        />
        <CalculatorButton
          title="Rand"
          customStyle={{...orientationStyle.calcBtn, ...theme.extend}}
        />
      </View>
    </View>
  );

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.displayContainer} {...panResponder.panHandlers}>
          <Text
            adjustsFontSizeToFit
            allowFontScaling
            numberOfLines={1}
            style={[styles.displayText, orientationStyle.displayText]}>
            {display}
          </Text>
        </View>
        <View style={styles.keyboardContainer}>
          {orientation === 'landscape' && renderExtendKeyboard()}
          {renderMainKeyboard()}
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  displayContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  displayText: {
    color: Colors.white,
    textAlign: 'right',
    fontWeight: '300',
    paddingHorizontal: 10,
  },
  keyboardContainer: {
    flexDirection: 'row',
    paddingHorizontal: PADDING_KEYBOARD,
    marginVertical: 5,
  },
  extendKeyboardContainer: {
    flex: 1.5,
  },
  mainKeyboardContainer: {
    flex: 1,
  },
  keyboardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonZero: {
    flex: 1.75,
    alignItems: 'flex-start',
  },
});

export default App;
