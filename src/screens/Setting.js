import React, { Component } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import { connect } from 'react-redux'
import { styles } from './../component/styles'
import * as actionUsers from './../redux/actions/actionsUser'
import {
    ActivityIndicator
} from 'react-native'
import {
    Container,
    Text,
    Button,
    ListItem,
    Left,
    Icon,
    Card,
    CardItem,
    List,
    Body,
    Thumbnail
} from 'native-base'

class SettingScreen extends Component {
    componentDidMount = async () => {
        const token = await AsyncStorage.getItem('token')
        await this.props.GetProfile(token)
    }
    render() {
        const {name, email} = this.props.users.users
        return (
            <Container>
                <ListItem>
                    <Left>
                        <Text style={styles.titleR}>Setting</Text>
                    </Left>
                </ListItem>
                <List transparent>
                    <ListItem noBorder thumbnail>
                        <Left>
                            <Icon name='user' style={{fontSize: 80, width: 100,}} type='AntDesign'/>
                        </Left>
                        <Body>
                            <Text>{name}</Text>
                            <Text>{email}</Text>
                            <Button
                                small
                                rounded
                                style={[styles.addbutton, { backgroundColor: '#3d3d3d', alignSelf: 'flex-start',marginLeft:0}]}
                                onPress={() => this.Logout()}
                            >
                                <Text style={{ fontWeight: 'bold', paddingRight: 0 }}>Logout</Text>
                                <Icon name='logout' type='AntDesign' style={{ color: '#fff' }} />
                            </Button>
                        </Body>
                    </ListItem>
                </List>
            </Container>
        )
    }
    Logout = async () => {
        await AsyncStorage.clear()
        this.props.navigation.navigate('Auth')
    }
}

const mapStateToProps = state => {
    return {
        users: state.users
    }
}

const mapDispatchToProps = dispatch => {
    return {
        GetProfile: (token) => dispatch(actionUsers.handleGetProfile(token))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SettingScreen)