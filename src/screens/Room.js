import React, { Component } from 'react'
import {
    View,
    TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import { FlatGrid } from 'react-native-super-grid'
import { styles } from './../component/styles'
import AsyncStorage from '@react-native-community/async-storage'
import * as actionRoom from './../redux/actions/actionsRoom'
import Modal from 'react-native-modal'
import {
    ActivityIndicator
} from 'react-native'
import {
    Container,
    Text,
    Button,
    Input,
    Item,
    Left,
    Body,
    ListItem
} from 'native-base'

class Room extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            data: null,
            visibleModal: null,
            visible: null,
            token: '',
            isLoading: true
        }
    }
    componentDidMount = async () => {
        const token = await AsyncStorage.getItem('token')
        this.setState({
            token
        })
        this.props.GetAllRoom(token)
    }
    edit(e) {
        const data = this.props.room.room
        const filter = data.filter(function (item) {
            const itemData = item.id == e
            return itemData
        })
        this.setState({
            data: filter,
            visibleModal: 'bottom',
            isLoading: false
        })
    }
    update = () => {
        const token = this.state.token
        this.props.GetAllRoom(token)
    }
    add() {
        this.setState({
            visible: 'bottom'
        })
    }
    saveEdit() {
        this.props.EditRoom({
            id: this.state.data[0].id,
            name: this.state.name,
            token: this.state.token
        })
        this.setState({ visibleModal: null })
        const token = this.state.token
        this.props.GetAllRoom(token)
    }
    save() {
        this.props.AddRoom({
            name: this.state.name,
            token: this.state.token
        })
        this.setState({
            visible: null,
            name: ''
        })
        const token = this.state.token
        this.props.GetAllRoom(token)
    }
    render() {
        const { isLoading } = this.state
        const { isSuccess } = this.props.room
        const Isloading = this.props.room.isLoading
        return (
            <Container>
                <ListItem>
                    <Left>
                        <Text style={styles.titleR}>Room</Text>
                    </Left>
                    <Body>
                        <Button
                            style={styles.btnRoom}
                            block
                            small
                            rounded
                            onPress={() => this.add()}
                        >
                            <Text>Add Room</Text>
                        </Button>
                    </Body>
                </ListItem>
                {
                    Isloading == false ?
                        <FlatGrid
                            itemDimension={130}
                            items={this.props.room.room}
                            style={styles.gridView}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity
                                    onPress={() => this.edit(item.id)}
                                >
                                    <View style={[styles.itemContainer, { backgroundColor: '#2ecc71' }]}>
                                        <Text style={styles.itemName}>{item.name}</Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                        :
                        <Container style={styles.center}>
                            <ActivityIndicator size='large' />
                            <Text>Please Wait...</Text>
                        </Container>
                }
                <Modal
                    isVisible={this.state.visibleModal}
                    onSwipeComplete={() => this.setState({ visibleModal: null })}
                    swipeDirection='down'
                    style={styles.modal}
                >
                    <View style={styles.editroom}>
                        <Text style={styles.titleEdit}>EDIT ROOM</Text>
                        <Item>
                            <Input
                                defaultValue={isLoading == false ? this.state.data[0].name : null}
                                onChangeText={(text) => this.setState({ name: text })}
                            />
                        </Item>
                    </View>
                    <Button
                        onPress={() => this.saveEdit()}
                        style={styles.addbutton}
                        success
                        full>
                        <Text>Edit</Text>
                    </Button>
                    <Button
                        onPress={() => this.setState({ visibleModal: null })}
                        style={styles.addbutton}
                        danger
                        full>
                        <Text>Cancel</Text>
                    </Button>
                </Modal>

                {/* MODAL ADD */}
                <Modal
                    isVisible={this.state.visible}
                    onSwipeComplete={() => this.setState({ visible: null })}
                    swipeDirection='down'
                    style={styles.modal}
                >
                    <View style={styles.viewmodal}>
                        <Item
                            style={styles.itemadd}
                        >
                            <Input
                                style={styles.addtext}
                                onChangeText={(name) => this.setState({ name })}
                            />
                        </Item>
                        <Button
                            onPress={() => this.save()}
                            style={styles.addbutton}
                            success
                            full>
                            <Text>Add</Text>
                        </Button>
                        <Button
                            onPress={() => this.setState({ visible: null })}
                            style={styles.addbutton}
                            danger
                            full>
                            <Text>Cancel</Text>
                        </Button>
                    </View>
                </Modal>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        room: state.room
    }
}

const mapDispatchToProps = dispatch => {
    return {
        GetAllRoom: (token) => dispatch(actionRoom.handleGetAllRoom(token)),
        AddRoom: (params) => dispatch(actionRoom.handleAddRoom(params)),
        EditRoom: (params) => dispatch(actionRoom.handleUpdateRoom(params))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Room)