import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Button,
} from 'react-native';
import {RTCView, mediaDevices} from 'react-native-webrtc';
import {Button as CustomButton} from '../components/Button';
import React from 'react';
import {SocketContext} from '../components/SocketContext';

class VideoCallScreen extends React.Component {
  static contextType = SocketContext;

  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
  
    this.context.myPeer.on('call', (call) => {
      this.context.AnswerCall(call);
    });

    this.context.socket.on('user-disconnected', () => {
      this.context.LeaveCall();
      this.props.navigation.navigate('Home');
    });

  }

  endCallHandler = () => {
    console.log('end call handler');
    this.context.LeaveCall();
    this.props.navigation.navigate('Home');
  };

  render() {
    const props = this.props;
    console.log('→ | VideoCallScreen | render | props:', props);

    const context = this.context;
    console.log('→ | VideoCallScreen | render | context:', context);
    
    return (
      <View style={styles.videoScreenContainer}>
        <View
          style={{
            position: 'absolute',
            top: 50,
            left: 0,
            right: 20,
            bottom: 0,
            justifyContent: 'flex-start',
            alignItems: 'flex-end',
          }}>
          {this.context.ownVideo ? (
            <RTCView
              streamURL={this.context.ownVideo.toURL()}
              style={{
                width: 150,
                height: 220,
                borderColor: 'lightgray',
                borderWidth: 1,
              }}
              zOrder={1}
              mirror={true}
            />
          ) : null}
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {this.context.remoteVideo ? (
            <RTCView
              streamURL={this.context.remoteVideo.toURL()}
              style={{width: '100%', height: '100%'}}
              objectFit="cover"
              mirror={true}
            />
          ) : null}
        </View>
          <View style={styles.buttonContainer}>
          <CustomButton
            imgUri={require('../assets/phone-hang-up.png')}
            backgroundColor="red"
            zIndex={10}
            onPress={() => this.endCallHandler()}
          />
        </View>
      </View>
    );
  }
}

export default VideoCallScreen;

const styles = StyleSheet.create({
  videoScreenContainer: {
    flex: 1,
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
