import { ActivityIndicator, View } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from './src/Context/context';
import Axios from './src/API/index';
import CallScreen from './src/screens/CallScreen';
import CheckUpScreen from './src/screens/CheckUpScreen';
import DrawerContent from './src/navigation/DrawerContent';
import HomeScreen from './src/screens/HomeScreen';
import MainTabScreen from './src/navigation/MainTabScreen';
import { NavigationContainer } from '@react-navigation/native';
import ReportsScreen from './src/screens/ReportsScreen';
import RootStackScreen from './src/login/RootStackScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import VideoCallScreen from './src/screens/VideoCallScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { SocketContext } from './src/components/SocketContext';

const Drawer = createDrawerNavigator();

const Stack = createStackNavigator();

const App = () => {
    initialLoginState = {
        isLoading: true,
        username: null,
        userToken: null,
    };
    const { DeleteSocketIdFromDb, mySocket } = useContext(SocketContext);

    const loginReducer = (prevState, action) => {
        switch (action.type) {
            case 'RETRIEVE_TOKEN':
                return {
                    ...prevState,
                    userToken: action.token,
                    isLoading: false,
                };

            case 'LOGIN':
                return {
                    ...prevState,
                    username: action.id,
                    userToken: action.token,
                    isLoading: false,
                };

            case 'LOGOUT':
                return {
                    ...prevState,
                    username: null,
                    userToken: null,
                    isLoading: false,
                };

            case 'REGISTER':
                return {
                    ...prevState,
                    username: action.id,
                    userToken: action.token,
                    isLoading: false,
                };

            default:
                return prevState;
        }
    };

    const [loginState, dispatch] = React.useReducer(
        loginReducer,
        initialLoginState,
    );

    const authContext = React.useMemo(
        () => ({
            signIn: (username, password) => {
                let userToken = null;
                Axios.post('auth/token/', {
                    username: username,
                    password: password,
                })
                    .then((response) => {
                        userToken = response.data.access;
                        return userToken;
                    })
                    .then((userToken) => {
                        console.log(userToken);
                        AsyncStorage.setItem('userToken', userToken);
                        dispatch({ type: 'LOGIN', id: username, token: userToken });
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            },
            signOut: async () => {
                console.log('socketin Context', mySocket);
                try {
                    await AsyncStorage.removeItem('userToken');
                } catch (e) {
                    console.log(e);
                }
                DeleteSocketIdFromDb(mySocket.id);
                dispatch({ type: 'LOGOUT' });
            },
            signUp: () => {
                setUserToken('abcd');
                setIsLoading(false);
            },
        }),
        [],
    );

    useEffect(() => {
        setTimeout(async () => {
            let userToken = null;
            try {
                userToken = await AsyncStorage.getItem('userToken');
            } catch (e) {
                console.log(e);
            }
            dispatch({
                type: 'RETRIEVE_TOKEN',
                token: userToken,
            });
        }, 100);
    }, []);

    if (loginState.isLoading) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                {loginState.userToken !== null ? (
                    <Drawer.Navigator
                        drawerContent={(props) => <DrawerContent {...props} />}>
                        <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
                        <Drawer.Screen name="CheckUpScreen" component={CheckUpScreen} />
                        <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
                        <Drawer.Screen name="ReportsScreen" component={ReportsScreen} />
                    </Drawer.Navigator>
                ) : (
                    <RootStackScreen />
                )}
            </NavigationContainer>
        </AuthContext.Provider>
    );
};

export default App;
