import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';

import Colors from '../constants/Colors';

const MARGIN_SIZE = 5;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: MARGIN_SIZE,
    flex: 1,
  },
  text: {
    fontWeight: '500',
  },
});

const CalculatorButton = ({onPress, title, customStyle, style}) => {
  const fontSize = customStyle.fontSize || 30;
  const height = (customStyle.height || 80) - MARGIN_SIZE * 2;
  const borderRadius = height / 2;
  const backgroundColor = customStyle.backgroundColor || Colors.brightOrange;
  const color = customStyle.color || Colors.white;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        {backgroundColor, height, borderRadius},
        {...style},
      ]}>
      <Text
        adjustsFontSizeToFit
        numberOfLines={1}
        style={[styles.text, {color, fontSize}]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

CalculatorButton.defaultProps = {
  onPress: () => {},
  title: '',
  style: {},
  customStyle: {},
};

export default CalculatorButton;
