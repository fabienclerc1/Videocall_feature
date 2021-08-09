import {
  Button,
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import EntypoIcon from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import {SocketContext} from '../components/SocketContext';
import {io} from 'socket.io-client/dist/socket.io';
import {useContext} from 'react';

class HomeScreen extends React.Component {
  static contextType = SocketContext;

  constructor(props) {
    super(props);
  }

  socket =
    Platform.OS === 'android'
      ? io('http://10.0.2.2:5000')
      : io('http://localhost:5000');

  componentDidMount() {
    this.context.setSocket(this.socket);
    this.context.mySocket.current = this.socket;
    this.socket.on('connect', () => {
      console.log(this.socket);
      this.context.StoreSocketIdInDb(this.socket.id);
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

    this.socket.on('cancel-call', () => {
      this.context.setCall({isReceivedCall: false});
    });

    this.socket.on('user-connected', (peerId) => {
      this.context.ConnectToNewUser(peerId);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.card_large}>
            <View style={styles.date_container}>
              <MaterialIcon
                name="keyboard-arrow-left"
                color="#d9d9d9"
                size={40}
              />
              <Text style={styles.text_date}>June 19, 2021</Text>
              <MaterialIcon
                name="keyboard-arrow-right"
                color="#d9d9d9"
                size={40}
              />
            </View>
            <View style={styles.sleep_score_container}>
              <View style={styles.sleep_score_widget}>
                <View style={styles.sleep_score_widget_inner}>
                  <Text style={styles.sleep_stats_text_1}>SLEEP SCORE</Text>
                  <Text style={styles.sleep_stats_text_4}>100</Text>
                  <Text style={styles.sleep_stats_text_1}>SLEEP - PEACE</Text>
                </View>
              </View>
            </View>
            <View style={styles.sleep_stats_container}>
              <Text style={styles.sleep_stats_text_1}>SLEEP TIME</Text>
              <Text style={styles.sleep_stats_text_2}>8:25 hrs</Text>
              <Text style={styles.sleep_stats_text_3}>10:00PM - 8:25AM</Text>
            </View>
          </View>
          <View style={styles.card_small}>
            <View style={styles.icon_container}>
              <View style={styles.icon_container_inner}>
                <Icon name="heartbeat" color="#e68070" size={30} />
              </View>
            </View>
            <Text style={styles.card_small_text}>HEART RATE - 62</Text>
            <View style={styles.card_small_plus}>
              <EntypoIcon name="plus" color="#d9d9d9" size={40} />
            </View>
          </View>
          <View style={styles.card_small}>
            <View style={styles.icon_container}>
              <View style={styles.icon_container_inner}>
                <EntypoIcon name="air" color="#6ed6db" size={30} />
              </View>
            </View>
            <Text style={styles.card_small_text}>BREATH RATE - 15</Text>
            <View style={styles.card_small_plus}>
              <EntypoIcon name="plus" color="#d9d9d9" size={40} />
            </View>
          </View>
          <View style={styles.card_small}>
            <View style={styles.icon_container}>
              <View style={styles.icon_container_inner}>
                <IonIcon name="ios-moon" color="#7084e6" size={30} />
              </View>
            </View>
            <Text style={styles.card_small_text}>FALL ASLEEP - 30</Text>
            <View style={styles.card_small_plus}>
              <EntypoIcon name="plus" color="#d9d9d9" size={40} />
            </View>
          </View>
          <View style={styles.card_small}>
            <View style={styles.icon_container}>
              <View style={styles.icon_container_inner}>
                <EntypoIcon name="tree" color="#6bdbab" size={30} />
              </View>
            </View>
            <Text style={styles.card_small_text}>ENVIRONMENT - 7</Text>
            <View style={styles.card_small_plus}>
              <EntypoIcon name="plus" color="#d9d9d9" size={40} />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default HomeScreen;

const {height, width} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    // justifyContent: 'flex-start',
    // alignItems: 'center',
  },
  contentContainer: {
    width: width,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  date_container: {
    // backgroundColor: 'green',
    display: 'flex',
    // backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text_date: {
    fontSize: 20,
    marginHorizontal: 5,
  },
  sleep_score_container: {
    height: 280,
    marginTop: 10,
    marginBottom: 20,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  sleep_score_widget: {
    height: 280,
    width: 280,
    borderRadius: 200,
    backgroundColor: '#3590E6',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sleep_score_widget_inner: {
    height: 260,
    width: 260,
    borderRadius: 200,
    backgroundColor: '#f7f7f7',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sleep_stats_container: {
    height: 100,
    // marginTop: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'lightgreen',
  },
  sleep_stats_text_1: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  sleep_stats_text_2: {
    fontSize: 40,
    fontWeight: '300',
  },
  sleep_stats_text_3: {
    fontSize: 16,
    fontWeight: '300',
  },
  sleep_stats_text_4: {
    fontSize: 90,
    fontWeight: '300',
    // backgroundColor: 'lightgreen',
  },
  card_large: {
    width: '95%',
    // height: 600,
    // backgroundColor: 'lightgreen',
    // backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 5,
    // marginVertical: 5,
    // box shadow
    // shadowColor: '#000',
    // shadowOffset: {
    // 	width: 0,
    // 	height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 6,
  },
  card_small: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '95%',
    height: 90,
    // backgroundColor: 'lightgreen',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 20,
    // paddingVertical: 30,
    marginVertical: 5,
    // box shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 6,
  },
  icon_container: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ebebeb',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon_container_inner: {
    width: 52,
    height: 52,
    borderRadius: 30,
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card_small_text: {
    fontSize: 22,
    fontWeight: '300',
    marginLeft: 15,
  },
  card_small_plus: {
    marginRight: 10,
    flexGrow: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    // backgroundColor: 'lightgreen',
  },
});
