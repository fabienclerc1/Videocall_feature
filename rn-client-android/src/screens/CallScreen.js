import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {Button as CustomButton} from '../components/Button';
import React from 'react';
import {SocketContext} from '../components/SocketContext';

class AudioCallScreen extends React.Component {
  static contextType = SocketContext;

  constructor(props) {
    super(props);
  }

  acceptCallHandler = () => {
    this.context.AcceptCall(this.context.call.roomId);
    this.props.navigation.navigate('VideoCall');
    
  };

  rejectCallHandler = () => {
    this.context.setCallAccepted(false);
    this.props.navigation.navigate('Home');
  };

  render() {
    return (
      <View style={styles.UIcontainer}>
        <Image
          style={styles.profileImage}
          source={require('../assets/user.svg')}
        />
        <Text style={styles.headerStyle}>Incoming call...</Text>
        <View style={styles.buttonContainer}>
          <CustomButton
            imgUri={require('../assets/phone-accept.png')}
            backgroundColor="green"
            zIndex={10}
            onPress={() => this.acceptCallHandler()}
          />
          <CustomButton
            imgUri={require('../assets/phone-hang-up.png')}
            backgroundColor="red"
            zIndex={10}
            onPress={() => this.rejectCallHandler()}
          />
        </View>
      </View>
    );
  }
}

export default AudioCallScreen;

const styles = StyleSheet.create({
  UIcontainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  profileImage: {
    height: 300,
    width: 300,
    borderRadius: 150,
    borderWidth: 4,
    borderColor: '#2491fc',
  },
  headerStyle: {
    width: '80%',
    height: 50,
    marginVertical: 20,
    // borderWidth: 2,
    borderRadius: 10,
    color: '#2491fc',
    fontSize: 28,
    paddingTop: 8,
    textAlign: 'center',
    borderColor: '#2491fc',
  },
  buttonContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 60,
    justifyContent: 'center',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
});
