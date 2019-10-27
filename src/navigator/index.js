import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import {
    Icon
} from 'native-base'

//Auth Login
import AuthLoading from './../screens/AuthLoading'

//Screen Public
import LoginScreen from './../screens/Login'

//Screen Private
import CheckinScreen from './../screens/Checkin'
import RoomScreen from './../screens/Room'
import CustomerScreen from './../screens/Customer'
import SettingScreen from './../screens/Setting'

const TabNavigator = createBottomTabNavigator({
    Checkin: {
        screen: CheckinScreen,
        navigationOptions: {
            tabBarOptions: {
                activeTintColor: '#2ecc71',
                labelStyle: {
                    fontSize: 14,
                },
            },
            tabBarLabel: 'Check In',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="checklist" size={40} style={{ color: tintColor }} type='Octicons' />
            )
        },
    },
    Room: {
        screen: RoomScreen,
        navigationOptions: {
            tabBarOptions: {
                activeTintColor: '#2ecc71',
                labelStyle: {
                    fontSize: 14,
                },
            },
            tabBarLabel: 'Room',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="bed" size={40} style={{ color: tintColor }} type='FontAwesome' />
            )
        },
    },
    Customer: {
        screen: CustomerScreen,
        navigationOptions: {
            tabBarOptions: {
                activeTintColor: '#2ecc71',
                labelStyle: {
                    fontSize: 14,
                },
            },
            tabBarLabel: 'Customer',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="customerservice" size={40} style={{ color: tintColor }} type='AntDesign' />
            )
        }
    },
    Setting: {
        screen: SettingScreen,
        navigationOptions: {
            tabBarOptions: {
                activeTintColor: '#2ecc71',
                labelStyle: {
                    fontSize: 14,
                },
            },
            tabBarLabel: 'Setting',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="setting" size={40} style={{ color: tintColor }} type='AntDesign' />
            )
        }
    },
},
    {
        initialRouteName: 'Room'
    });

const Private = createStackNavigator({
    Home: {
        screen: TabNavigator,
        navigationOptions: {
            header: null
        }
    }
},
    {
        initialRouteName: 'Home'
    })
const Public = createSwitchNavigator({
    AuthLoading: AuthLoading,
    App: Private,
    Auth: LoginScreen
},
    {
        initialRouteName: 'AuthLoading'
    })


export default createAppContainer(Public)

