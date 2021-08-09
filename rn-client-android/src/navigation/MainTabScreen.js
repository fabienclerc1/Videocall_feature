import CallScreen from '../screens/CallScreen';
import HomeScreen from '../screens/HomeScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProfileScreen from '../screens/ProfileScreen';
import React from 'react';
import VideoCallScreen from '../screens/VideoCallScreen';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

const HomeStack = createStackNavigator();
const ChatStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => (
    <Tab.Navigator initialRouteName="Home" activeColor="#fff" shifting={true}>
        <Tab.Screen
            name="Home"
            component={HomeStackScreen}
            options={{
                tabBarLabel: 'Home',
                tabBarColor: '#3590E6',
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="home" color={color} size={26} />
                ),
            }}
        />
        <Tab.Screen
            name="Profile"
            component={ProfileStackScreen}
            options={{
                tabBarLabel: 'Profile',
                tabBarColor: '#3590E6',
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="account" color={color} size={26} />
                ),
            }}
        />
    </Tab.Navigator>
);

export default MainTabScreen;

const HomeStackScreen = ({ navigation }) => {
    return (
        <HomeStack.Navigator
            screenOptions={{
                headerStyle: {
                    borderBottomColor: '#BCBCBC',
                },
                headerTintColor: '#3590E6',
                headerTitleStyle: {
                    fontSize: 22,
                },
            }}>
            <HomeStack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    title: 'videocall Companion',
                    headerLeft: () => (
                        <Icon.Button
                            name="ios-menu"
                            size={25}
                            backgroundColor="#fff"
                            color="#3590E6"
                            onPress={() => {
                                navigation.openDrawer();
                            }}></Icon.Button>
                    ),
                }}
            />
            <HomeStack.Screen
                options={{
                    headerShown: false,
                }}
                name="VideoCall"
                component={VideoCallScreen}
            />
            <HomeStack.Screen
                options={{
                    headerShown: false,
                }}
                name="AudioCall"
                component={CallScreen}
            />
        </HomeStack.Navigator>
    );
};

const ProfileStackScreen = ({ navigation }) => {
    return (
        <ProfileStack.Navigator
            screenOptions={{
                headerStyle: {
                    borderBottomColor: '#BCBCBC',
                },
                headerTintColor: '#3590E6',
                headerTitleStyle: {
                    fontSize: 22,
                },
            }}>
            <ProfileStack.Screen
                name="Chat"
                component={ProfileScreen}
                options={{
                    title: 'videocall Companion',
                    headerLeft: () => (
                        <Icon.Button
                            name="ios-menu"
                            size={25}
                            backgroundColor="#fff"
                            color="#3590E6"
                            onPress={() => {
                                navigation.openDrawer();
                            }}></Icon.Button>
                    ),
                }}
            />
        </ProfileStack.Navigator>
    );
};
