import React, { Component } from 'react'
import { connect } from 'react-redux'
import { styles } from './../component/styles'
import * as actionUsers from './../redux/actions/actionsUser'
import AsyncStorage from '@react-native-community/async-storage'
import {Image} from 'react-native'
import {
    Container,
    Text,
    Button,
    Icon,
    Input,
    Toast,
    Item
} from 'native-base'

class Login extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            onLogin: false
        }
    }
    login = async () => {
        const email = this.state.email
        const password = this.state.password

        //Validate Field Input and Execute to API
        if (email) {
            if (password) {
                this.props.Login({
                    email: this.state.email,
                    password: this.state.password
                })
                Toast.show({
                    text: 'Please wait ....',
                    textStyle: { fontWeight: 'bold' },
                    duration: 2000,
                    style: { margin: 20, borderRadius: 10 }
                })
                this.setState({ onLogin: true })
            } else {
                Toast.show({
                    text: "! Password empty",
                    textStyle: { fontWeight: 'bold' },
                    duration: 2000,
                    style: { margin: 20, borderRadius: 10 }
                })
            }
        } else {
            Toast.show({
                text: "! Email empty",
                textStyle: { fontWeight: 'bold' },
                duration: 2000,
                style: { margin: 20, borderRadius: 10 }
            })
        }
    }
    render() {
        //To show a Toast and checked if login success
        const { isLoading, isSuccess, isError } = this.props.users
        const { token, message } = this.props.users.users
        const { onLogin } = this.state
        if (isLoading == false && isSuccess == true && token && onLogin == true) {
            AsyncStorage.setItem('token', token)
            this.props.navigation.navigate('App')
            this.setState({ onLogin: false })
        } else if (message && !token && onLogin == true) {
            Toast.show({
                text: message,
                textStyle: { fontWeight: 'bold' },
                duration: 2000,
                style: { margin: 20, borderRadius: 10 }
            })
            this.setState({ onLogin: false })
        }
        if(isError == true){
            Toast.show({
                text: 'Check your connection',
                duration: 2000,
                style: { margin: 20, borderRadius: 10 }
            })
        }
        return (
            //----- Main Container ----//
            <Container style={styles.login}>
                <Image source={require('./../component/assets/logo.png')} style={{width:160, height:160}}/>
                <Text style={{ fontSize: 30, fontWeight: 'bold', marginBottom: 30}}>Light Coworking Space</Text>
                <Text style={{ fontSize: 20 }}>Welcome back!</Text>
                {/* Form Login */}
                <Item style={[styles.item, { paddingHorizontal: 30 }]}>
                    <Icon name='user' type='AntDesign'/>
                    <Input
                        style={[styles.inputLight, { borderWidth: 1, borderColor: '#3d3d3d' }]}
                        keyboardType='email-address'
                        placeholder="Email"
                        onChangeText={(email) => this.setState({ email })} 
                    />
                </Item>
                <Item style={[styles.item, { paddingHorizontal: 30 }]}>
                    <Icon name='lock' type='AntDesign'/>
                    <Input
                        style={[styles.inputLight, { borderWidth: 1, borderColor: '#3d3d3d' }]}
                        placeholder="Password"
                        secureTextEntry={true}
                        onChangeText={(password) => this.setState({ password })} 
                    />
                </Item>
                <Button
                    rounded
                    onPress={() => this.login()}
                    style={[styles.addbutton, { backgroundColor: '#3d3d3d', marginRight: 30 }]}
                >
                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>Sign In</Text>
                    <Icon name='rightcircle' type='AntDesign' />
                </Button>
                {/* End Form Login */}
            </Container>
            //----- End Main Container ----//
        )
    }
}


//Redux
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