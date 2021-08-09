import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';

import React from 'react';

export const Button = (props) => {
  return (
    <View>
      <TouchableOpacity
        activeOpacity={1}
        onPress={props.onPress}
        style={[
          {backgroundColor: props.backgroundColor},
          {zIndex: props.zIndex},
          props.style,
          styles.button,
        ]}>
        <Image source={props.imgUri} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 80,
    height: 80,
    marginHorizontal: 20,
    elevation: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
});
