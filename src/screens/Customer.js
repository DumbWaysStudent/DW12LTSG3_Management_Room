import React, { Component } from 'react'
// import * as actionSetting from './../redux/actions/actionSetting'
import { connect } from 'react-redux'
import { styles } from './../component/styles'
import * as actionCustomer from './../redux/actions/actionsCustomer'
import AsyncStorage from '@react-native-community/async-storage'
import Modal from 'react-native-modal'
import {
    FlatList,
    ActivityIndicator,
    TouchableOpacity,
    View,
    Image
} from 'react-native'
import {
    Container,
    Text,
    Button,
    Fab,
    Icon,
    Item,
    Input,
    Card,
    Left,
    Right,
    CardItem,
    ListItem,
    List,
    Thumbnail,
    Body,
} from 'native-base'

class CustomerScreen extends Component {
    constructor() {
        super()
        this.state = {
            visible: null,
            visibleE: null,
            isLoading: true,
            token: '',
            name: '',
            idcard: '',
            phonenumber: '',
            image: '',
            data: ''
        }
    }
    componentDidMount = async () => {
        const token = await AsyncStorage.getItem('token')
        this.setState({
            token
        })
        this.props.GetAllCustomer(token)
    }
    update = () => {
        const token = this.state.token
        this.props.GetAllCustomer(token)
    }
    showAddModel() {
        this.setState({
            visible: 'bottom'
        })
    }
    save() {
        this.props.AddCustomer({
            name: this.state.name,
            id_card: this.state.idcard,
            phone_number: this.state.phonenumber,
            image: this.state.image,
            token: this.state.token
        })
        this.setState({
            name: '',
            id_card: '',
            phone_number: '',
            image: '',
        })
        this.update()
    }
    showEdit(e) {
        const data = this.props.customer.customer
        const filter = data.filter(function (item) {
            const itemData = item.id == e
            return itemData
        })
        this.setState({
            data: filter,
            visibleE: 'bottom',
            isLoading: false
        })
    }
    saveEdit() {
        this.props.EditCustomer({
            id: this.state.data[0].id,
            name: this.state.name,
            id_card: this.state.idcard,
            phone_number: this.state.phonenumber,
            image: this.state.image,
            token: this.state.token
        })
        this.setState({
            visibleE: null,
            isLoading: true
        })
        this.update()
    }
    render() {
        const { isLoading } = this.state
        const isLoadingA = this.props.customer.isLoading
        return (
            <Container>
                <Text style={styles.title}>
                    Customers
                </Text>
                {
                    isLoadingA == false ?
                        <FlatList
                            keyExtractor={(item, index) => index.toString()}
                            refreshing={isLoadingA}
                            onRefresh={this.update}
                            data={this.props.customer.customer}
                            renderItem={({ item, index }) => (
                                <List key={item.id}>
                                    <ListItem thumbnail onPress={() => this.showEdit(item.id)}>
                                        <Left>
                                            <Thumbnail square />
                                        </Left>
                                        <Body>
                                            <Text>{item.name}</Text>
                                            <Text note numberOfLines={1}>ID CARD : {item.id_card}</Text>
                                            <Text note numberOfLines={2}>Phone Number :{item.phone_number}</Text>
                                        </Body>
                                    </ListItem>
                                </List>
                            )}
                        />
                        :
                        <Container style={styles.center}>
                            <ActivityIndicator size='large' />
                            <Text>Please Wait...</Text>
                        </Container>
                }
                <Fab
                    position='bottomRight'
                    onPress={() => this.showAddModel()}
                    style={{backgroundColor: '#4b4b4b'}}
                >
                    <Icon name='ios-add' />
                </Fab>

                {/* MODAL ADD */}
                <Modal
                    isVisible={this.state.visible}
                    onSwipeComplete={() => this.setState({ visible: null })}
                    swipeDirection='down'
                    style={styles.modal}
                >
                    <View style={styles.viewmodal}>
                        <Item style={styles.itemadd}>
                            <Input
                                style={styles.addtext}
                                placeholder="NAME"
                                placeholderTextColor='#fff'
                                onChangeText={(name) => this.setState({ name })}
                            />
                        </Item>
                        <Item style={styles.itemadd}>
                            <Input
                                style={styles.addtext}
                                placeholder="ID CARD"
                                placeholderTextColor='#fff'
                                onChangeText={(text) => this.setState({ idcard: text })}
                            />
                        </Item>
                        <Item style={styles.itemadd}>
                            <Input
                                style={styles.addtext}
                                placeholder="PHONE NUMBER"
                                placeholderTextColor='#fff'
                                onChangeText={(text) => this.setState({ phonenumber: text })}
                            />
                        </Item>
                        <Item style={styles.itemadd}>
                            <Button><Text>ADD IMAGE</Text></Button>
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

                {/* MODAL EDIT */}
                <Modal
                    isVisible={this.state.visibleE}
                    onSwipeComplete={() => this.setState({ visibleE: null })}
                    swipeDirection='down'
                    style={styles.modal}
                >
                    <View style={styles.viewmodal}>
                        <Item style={styles.itemadd}>
                            <Input
                                style={styles.addtext}
                                placeholder="NAME"
                                placeholderTextColor='#fff'
                                defaultValue={isLoading == false ? this.state.data[0].name : null}
                                onChangeText={(name) => this.setState({ name })}
                            />
                        </Item>
                        <Item style={styles.itemadd}>
                            <Input
                                style={styles.addtext}
                                placeholder="ID CARD"
                                placeholderTextColor='#fff'
                                defaultValue={isLoading == false ? this.state.data[0].id_card : null}
                                onChangeText={(text) => this.setState({ idcard: text })}
                            />
                        </Item>
                        <Item style={styles.itemadd}>
                            <Input
                                style={styles.addtext}
                                placeholder="PHONE NUMBER"
                                placeholderTextColor='#fff'
                                defaultValue={isLoading == false ? this.state.data[0].phone_number : null}
                                onChangeText={(text) => this.setState({ phonenumber: text })}
                            />
                        </Item>
                        <Item style={styles.itemadd}>
                            <Button><Text>ADD IMAGE</Text></Button>
                        </Item>
                        <Button
                            onPress={() => this.saveEdit()}
                            style={styles.addbutton}
                            success
                            full>
                            <Text>Edit</Text>
                        </Button>
                        <Button
                            onPress={() => this.setState({ visibleE: null })}
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
        customer: state.customer
    }
}

const mapDispatchToProps = dispatch => {
    return {
        GetAllCustomer: (token) => dispatch(actionCustomer.handleGetCustomer(token)),
        AddCustomer: (params) => dispatch(actionCustomer.handleAddCustomer(params)),
        EditCustomer: (params) => dispatch(actionCustomer.handleEditCustomer(params)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CustomerScreen)