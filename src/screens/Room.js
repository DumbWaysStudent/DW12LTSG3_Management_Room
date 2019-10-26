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
    Flatlist,
    Input,
    Item
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
    Edit(e) {
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
    Add() {
        this.setState({
            visible: 'bottom'
        })
    }
    render() {
        const { isLoading} = this.state
        return (
            <Container>
                <Text style={styles.title}>Room</Text>
                <FlatGrid
                    itemDimension={130}
                    items={this.props.room.room}
                    style={styles.gridView}
                    // staticDimension={300}
                    // fixed
                    // spacing={20}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            onPress={() => this.Edit(item.id)}
                        >
                            <View style={[styles.itemContainer, { backgroundColor: '#2ecc71' }]}>
                                <Text style={styles.itemName}>{item.name}</Text>
                            </View>
                        </TouchableOpacity>

                    )}
                />
                <Button
                    onPress={() => this.Add()}
                >
                    <Text>Add Room</Text>
                </Button>
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
                                onChangeText={(text)=>this.setState({name: text})}
                            />
                        </Item>
                    </View>
                    <Button
                        onPress={() => this.SaveEdit()}
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
                            onPress={() => this.Save()}
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
    SaveEdit() {
        this.props.EditRoom({
            id: this.state.data[0].id,
            name: this.state.name,
            token: this.state.token
        })
        this.setState({ visibleModal: null })
        const token =this.state.token
        this.props.GetAllRoom(token)
    }
    Save() {
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