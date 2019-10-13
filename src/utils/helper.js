import {Dimensions} from 'react-native';
import Colors from '../constants/Colors';

export const getStyleForOrientation = paddingOfKeyBoard => {
  const {width, height} = Dimensions.get('window');
  const widthOfKeyBoard = width - paddingOfKeyBoard;

  if (width > height) {
    // landscape mode
    let heightOfBtn = widthOfKeyBoard / 10 - 10;
    const maximumOfHeightBtn = (height - 90) / 5;
    if (heightOfBtn > maximumOfHeightBtn) {
      heightOfBtn = maximumOfHeightBtn;
    }
    return {
      calcBtn: {
        height: heightOfBtn,
        fontSize: 25,
      },
      displayText: {
        fontSize: 50,
        marginTop: 8,
      },
      buttonZero: {
        paddingLeft: widthOfKeyBoard / 20 - 10,
      },
    };
  }

  // portrait mode
  return {
    calcBtn: {
      height: widthOfKeyBoard / 4,
      fontSize: 30,
    },
    displayText: {
      fontSize: 88,
      marginBottom: 5,
    },
    buttonZero: {
      paddingLeft: widthOfKeyBoard / 8 - 10,
    },
  };
};

export const ThemeOfCalcBtn = {
  operator: {
    backgroundColor: Colors.brightOrange,
    color: Colors.white,
  },
  operatorHighlight: {
    backgroundColor: Colors.white,
    color: Colors.brightOrange,
  },
  unaryOperator: {
    backgroundColor: Colors.gray,
    color: Colors.black,
  },
  digit: {
    backgroundColor: Colors.darkGray,
    color: Colors.white,
  },
  extend: {
    backgroundColor: Colors.dark,
    color: Colors.white,
    fontSize: 15,
  },
};
