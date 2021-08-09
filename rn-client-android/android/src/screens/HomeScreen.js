import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SocketContext} from '../components/SocketContext';
import {useContext} from 'react';
import {io} from 'socket.io-client/dist/socket.io';

class HomeScreen extends React.Component {
  static contextType = SocketContext;

  constructor(props) {
    super(props);
  }
  socket = io('http://10.0.2.2:5000');

  componentDidMount() {
    this.context.setSocket(this.socket);

    this.socket.on('connect', () => {
      this.socket.emit('connect-server');
    });

    this.socket.on('callUser', ({from, name: callerName, roomId}) => {
      this.context.setCall({
        isReceivedCall: true,
        from,
        name: callerName,
        roomId,
      });
      this.props.navigation.navigate('AudioCall');
    });

    this.socket.on('user-connected', (peerId) => {
      this.context.ConnectToNewUser(peerId);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textHeader}>videocall</Text>
      </View>
    );
  }
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textHeader: {
    fontSize: 24,
    marginVertical: 20,
  },
  textSubHeader: {
    fontSize: 16,
  },
});
