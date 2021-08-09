import * as Animatable from 'react-native-animatable';

import {
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';

const SplashScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View>
        <Image
          style={styles.backgroundImage}
          source={require('../assets/night-sky.png')}
          resizeMode="cover"
        />
      </View>
      <View style={styles.header}>
        {/* <Text>Header</Text> */}
        <Animatable.Image
          // animation="bounceIn"
          animation="fadeIn"
          duration={2000}
          source={require('../assets/duo_black.svg')}
          style={styles.logo}
          resizeMode="stretch"
        />
      </View>
      <Animatable.View
        style={styles.footer}
        // animation="fadeInUpBig"
        animation="fadeIn"
        duration={2000}>
        <Text style={styles.title}>Videocall Companion</Text>
        {/* <Text style={styles.text}>Sign in with account</Text> */}
        <View style={styles.button}>
          <TouchableOpacity onPress={() => navigation.navigate('SignInScreen')}>
            <LinearGradient
              // colors={['#0C82EC', '#073561']}
              colors={['#0C82EC', '#095EAC']}
              style={styles.signIn}>
              <Text style={styles.textSign}>Get Started</Text>
              <MaterialIcon name="navigate-next" color="#fff" size={20} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default SplashScreen;

const {height, width} = Dimensions.get('screen');
const height_logo = height * 0.25;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    height: height,
    width: width,
  },
  header: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    // borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 30,
    marginBottom: 20,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  logo: {
    width: height_logo,
    height: height_logo,
  },
  title: {
    color: '#05375a',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 10,
  },
  text: {
    color: 'grey',
    marginTop: 5,
  },
  button: {
    alignItems: 'center',
    marginTop: 40,
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
  },
});
