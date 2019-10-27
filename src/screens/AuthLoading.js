import React from 'react'
import {
    ActivityIndicator,
    StatusBar,
    View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import { styles } from '../component/styles';

export default class AuthLoadingScreen extends React.Component {
    componentDidMount() {
        this.Storage()
    }
    Storage = async () => {
        const userToken = await AsyncStorage.getItem('token')
        this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    }
    render() {
        return (
            <View
                style={styles.activity}
            >
                <Container style={styles.center}>
                    <ActivityIndicator size='large' />
                    <Text>Please Wait...</Text>
                </Container>
            </View>
        )
    }
}
