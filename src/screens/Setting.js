import React, { Component } from 'react'
// import * as actionSetting from './../redux/actions/actionSetting'
import AsyncStorage from '@react-native-community/async-storage'
import { connect } from 'react-redux'
import { style } from './../component/styles'
import {
    FlatList,
    ActivityIndicator
} from 'react-native'
import {
    Container,
    Text,
    Button
} from 'native-base'

class SettingScreen extends Component {
    render() {
        return (
            <Container>
                <Text>Setting</Text>
                <Button
                    onPress={() => this.Logout()}
                >
                    <Text>Logout</Text>
                </Button>
            </Container>
        )
    }
    Logout = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    };
}

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SettingScreen)