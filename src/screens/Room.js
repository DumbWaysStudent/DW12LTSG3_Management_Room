import React, { Component } from 'react'
import {
    View,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native'
import { connect } from 'react-redux'
import { FlatGrid } from 'react-native-super-grid'
import { styles } from './../component/styles'
import AsyncStorage from '@react-native-community/async-storage'
import * as actionRoom from './../redux/actions/actionsRoom'
import Modal from 'react-native-modal'
import {
    Container,
    Text,
    Button,
    Input,
    Item,
    Left,
    Body,
    Fab,
    Icon,
    ListItem,
    Form,
    Toast,
    Label
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
    //--- Show Modal Edit Room --//
    edit(e) {
        const data = this.props.room.room
        const filter = data.filter(function (item) {
            const itemData = item.id == e
            return itemData
        })
        this.setState({
            data: filter,
            visibleModal: 'fancy',
            isLoading: false
        })
    }
    //--- Update List Room ---//
    update = () => {
        const token = this.state.token
        this.props.GetAllRoom(token)
    }
    //--- Add Room ---//
    add() {
        this.setState({
            visible: 'fancy'
        })
    }
    //--- Execute Edit Room ---//
    saveEdit = async () => {
        await this.props.EditRoom({
            id: this.state.data[0].id,
            name: this.state.name,
            token: this.state.token
        })
        Toast.show({
            text: 'Please Wait ....',
            duration: 3000,
            style: { margin: 20, borderRadius: 10 }
        })
        this.setState({ visibleModal: null })
        const token = this.state.token
        await this.props.GetAllRoom(token)
    }
    //--- Execute Add Room ---//
    save = async () => {
        await this.props.AddRoom({
            name: this.state.name,
            token: this.state.token
        })
        Toast.show({
            text: 'Please Wait ....',
            duration: 3000,
            style: { margin: 20, borderRadius: 10 }
        })
        this.setState({
            visible: null,
            name: ''
        })
        const token = this.state.token
        await this.props.GetAllRoom(token)
    }
    render() {
        const { isLoading } = this.state
        const { isError } = this.props.room
        const isLoadingData = this.props.room.isLoading
        switch (isLoadingData) {
            case true:
                return (
                    <Container style={styles.center}>
                        <ActivityIndicator size='large' />
                        <Text>Please Wait...</Text>
                    </Container>
                )
                break;
            case false:
                if (isError == true) {
                    return (
                        <Container style={styles.center}>
                            <Text>404 Not Found</Text>
                        </Container>
                    )
                } else {
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
                                        <Icon name='plus' type='FontAwesome' />
                                        <Text style={{ fontWeight: 'bold', paddingLeft: 0 }}>Add Room</Text>
                                    </Button>
                                </Body>
                            </ListItem>
                            {
                                this.props.room.room == '' ?
                                    <Text style={styles.nodata}>No result data</Text>
                                    :
                                    <FlatGrid
                                        refreshing={isLoadingData}
                                        onRefresh={this.update}
                                        keyExtractor={(item, index) => index.toString()}
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
                            }

                            <Modal
                                isVisible={this.state.visibleModal}
                                onSwipeComplete={() => this.setState({ visibleModal: null })}
                                swipeDirection='down'
                                style={[styles.modal]}
                                hasBackdrop={false}
                                onBackButtonPress={() => this.setState({ visible: '' })}
                                onBackdropPress={()=> this.setState({ visible: '' })}
                            >
                                <Container style={styles.modalGeneral}>
                                    <Text style={styles.titleModal}>EDIT ROOM</Text>
                                    <Item style={[styles.margin, { marginTop: 20 }, styles.item]}>
                                        <Input
                                            style={styles.inputLight}
                                            defaultValue={isLoading == false ? this.state.data[0].name : null}
                                            onChangeText={(text) => this.setState({ name: text })}
                                        />
                                    </Item>
                                    <Fab position='topRight' style={styles.btnclose}
                                        onPress={() => this.setState({ visibleModal: '', isLoading: true })}
                                    >
                                        <Icon name='cross' type='Entypo' style={{ color: '#3d3d3d' }} />
                                    </Fab>
                                    <Button
                                        onPress={() => this.saveEdit()}
                                        style={styles.addbutton}
                                        rounded>
                                        <Text style={{ color: '#3d3d3d', fontWeight: 'bold' }}>Edit</Text>
                                        <Icon name='rightcircle' type='AntDesign' style={{ color: '#3d3d3d' }} />
                                    </Button>
                                </Container>

                            </Modal>

                            {/* MODAL ADD */}
                            <Modal
                                isVisible={this.state.visible}
                                onSwipeComplete={() => this.setState({ visible: '' })}
                                swipeDirection='down'
                                style={[styles.modal]}
                                hasBackdrop={false}
                                onBackButtonPress={() => this.setState({ visible: '' })}
                                onBackdropPress={()=> this.setState({ visible: '' })}
                            >
                                <Container style={styles.modalGeneral}>
                                    <Text style={styles.titleModal}>
                                        Add Room
                                    </Text>
                                    <Form style={{ marginTop: 10 }}>
                                        <Label style={styles.margin}>Room Name</Label>
                                        <Item style={styles.item} >
                                            <Input
                                                style={styles.inputLight}
                                                onChangeText={(name) => this.setState({ name })}
                                            />
                                        </Item>
                                        <Button
                                            rounded={true}
                                            onPress={() => this.save()}
                                            style={styles.addbutton}
                                        >
                                            <Text style={{ color: '#3b3b3b', fontWeight: 'bold' }}>Add</Text>
                                            <Icon name='rightcircle' type='AntDesign' style={{ color: '#3d3d3d' }} />
                                        </Button>
                                    </Form>
                                    <Fab position='topRight' style={styles.btnclose}
                                        onPress={() => this.setState({ visible: '', isLoad: true })}
                                    >
                                        <Icon name='cross' type='Entypo' style={{ color: '#3d3d3d' }} />
                                    </Fab>
                                </Container>
                            </Modal>
                        </Container>
                    )
                }
        }
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