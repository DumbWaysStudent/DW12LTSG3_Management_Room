import React, { Component } from 'react'
import { styles } from './../component/styles'
import { connect } from 'react-redux'
import * as actionUsers from './../redux/actions/actionsUser'

import {
    Container,
    Text,
    Button,
    Icon,
    Input,
    Toast,
    Item
} from 'native-base'
import AsyncStorage from '@react-native-community/async-storage'

class Login extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: ''
        }
    }
    Login = async () => {
        this.props.Login({
            email: this.state.email,
            password: this.state.password
        })
    }
    render() {
        const { isLoading, isSuccess } = this.props.users
        const { token, message } = this.props.users.users
        if (isLoading == false && isSuccess == true && token) {
            AsyncStorage.setItem('token', token)
            this.props.navigation.navigate('App')
        } else if(message){
            Toast.show({
                text: message,
                duration: 2000
            })
        }
        return (
            <Container
                style={styles.login}
            >
                <Text> Login</Text>
                <Item>
                    <Input
                        placeholder="Email"
                        onChangeText={(email) => this.setState({ email })} />
                </Item>

                <Item>
                    <Input
                        placeholder="Password"
                        onChangeText={(password) => this.setState({ password })} />
                </Item>
                <Button
                    onPress={() => this.Login()}
                    success
                >
                    <Text>Login</Text>
                </Button>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        users: state.users
    }
}

const mapDispatchToProps = dispatch => {
    return {
        Login: (params) => dispatch(actionUsers.handleLogin(params))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)