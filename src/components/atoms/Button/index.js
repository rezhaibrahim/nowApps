import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Button = ({title, onPress}) => {
  return (
    <TouchableOpacity style={style.btnTouch} onPress={onPress}>
      <Text style={style.textTouch}>{title}</Text>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  btnTouch: {
    backgroundColor: '#DB3022',
    borderRadius: 25,
    paddingVertical: 13,
  },
  textTouch: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
});
export default Button;
