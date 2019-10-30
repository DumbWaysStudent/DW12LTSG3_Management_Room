import React, { Component } from 'react'
// import * as actionSetting from './../redux/actions/actionSetting'
import { connect } from 'react-redux'
import { styles } from './../component/styles'
import * as actionCustomer from './../redux/actions/actionsCustomer'
import AsyncStorage from '@react-native-community/async-storage'
import Modal from 'react-native-modal'
import ImagePicker from 'react-native-image-picker'
import {
    FlatList,
    ActivityIndicator,
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
    Left,
    ListItem,
    List,
    Thumbnail,
    Body,
    Form,
    Label,
    Toast
} from 'native-base'
import { API_URL } from '../component/host'

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
            fileName: '',
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
    //--- Select Image ---//
    selectImage = () => {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true,
            },
        };
        ImagePicker.showImagePicker(options, res => {
            const source = res.uri
            const fileName = res.fileName
            if (!res.didCancel) {
                if (!res.error) {
                    this.setState({
                        image: source,
                        fileName
                    })
                }
            }
        })
    }
    //--- Update List Customer ---//
    update = async () => {
        const token = this.state.token
        await this.props.GetAllCustomer(token)
    }
    //--- Modal Add Customer ---//
    showAddModel() {
        this.setState({
            visible: 'bottom'
        })
    }
    //--- Execute Add Customer ---//
    save = async () => {
        const formDataCustomer = new FormData()
        formDataCustomer.append('image', {
            uri: this.state.image,
            type: 'image/jpeg',
            name: this.state.fileName
        })
        formDataCustomer.append('name', this.state.name)
        formDataCustomer.append('id_card', this.state.idcard)
        formDataCustomer.append('phone_number', this.state.phonenumber)
        await this.props.AddCustomer({
            formDataCustomer,
            token: this.state.token
        })
        Toast.show({
            text: 'Please Wait ....',
            duration: 3000,
            style: { margin: 20, borderRadius: 10 }
        })
        this.setState({
            name: '',
            id_card: '',
            phone_number: '',
            image: '',
            visible: ''
        })
        this.update()
    }
    //--- Show Modal Edit ---//
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
    //--- Execute Edit ---//
    saveEdit = async () => {
        const formDataCustomer = new FormData()
        formDataCustomer.append('image', {
            uri: this.state.image,
            type: 'image/jpeg',
            name: this.state.fileName
        })
        formDataCustomer.append('name',
            this.state.name == '' ? this.state.data[0].name : this.state.name)
        formDataCustomer.append('id_card', this.state.idcard == '' ?
            this.state.data[0].id_card : this.state.idcard)
        formDataCustomer.append('phone_number',
            this.state.phonenumber == '' ? this.state.data[0].phone_number : this.state.phonenumber)
        await this.props.EditCustomer({
            id: this.state.data[0].id,
            formDataCustomer,
            token: this.state.token
        })
        Toast.show({
            text: 'Please Wait ....',
            duration: 3000,
            style: { margin: 20, borderRadius: 10 }
        })
        this.setState({
            visibleE: '',
            image: '',
            isLoading: true
        })
        this.update()
    }
    render() {
        const { isLoading, image } = this.state
        const isLoadingA = this.props.customer.isLoading
        const { isError } = this.props.customer
        switch (isLoadingA) {
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
                                    <Text style={styles.titleR}>Customers</Text>
                                </Left>
                            </ListItem>
                            {
                                this.props.customer.customer == '' ?
                                    <Text style={styles.nodata}>No result data</Text>
                                    :
                                    <FlatList
                                        keyExtractor={(item, index) => index.toString()}
                                        refreshing={isLoadingA}
                                        onRefresh={this.update}
                                        data={this.props.customer.customer}
                                        renderItem={({ item, index }) => (
                                            <List key={item.id}>
                                                <ListItem thumbnail onPress={() => this.showEdit(item.id)}>
                                                    <Left>
                                                        <Thumbnail square source={{ uri: `${API_URL}/${item.image}` }} />
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
                            }

                            <Fab position='bottomRight'
                                onPress={() => this.showAddModel()}
                                style={{ backgroundColor: '#4b4b4b' }}
                            >
                                <Icon name='ios-add' />
                            </Fab>

                            {/* MODAL ADD */}
                            <Modal
                                isVisible={this.state.visible}
                                onSwipeComplete={() => this.setState({ visible: '' })}
                                swipeDirection='down'
                                style={styles.modal}
                                hasBackdrop={false}
                                onBackButtonPress={() => this.setState({ visible: '' })}
                                onBackdropPress={()=> this.setState({ visible: '' })}
                                avoidKeyboard={true}

                            >
                                <Container style={styles.modalGeneral}>
                                    <Text style={styles.titleModal}>Add Customer</Text>
                                    <Form style={{ marginTop: 10 }}>
                                        <Label style={styles.margin}>Name</Label>
                                        <Item style={styles.item}>
                                            <Input
                                                style={styles.inputLight}
                                                placeholder="NAME"
                                                placeholderTextColor='#fff'
                                                onChangeText={(name) => this.setState({ name })}
                                            />
                                        </Item>
                                        <Label style={styles.margin}>ID Card</Label>
                                        <Item style={styles.item}>
                                            <Input
                                                style={styles.inputLight}
                                                keyboardType='numeric'
                                                placeholder="ID CARD"
                                                keyboardType='numeric'
                                                placeholderTextColor='#fff'
                                                onChangeText={(text) => this.setState({ idcard: text })}
                                            />
                                        </Item>
                                        <Label style={styles.margin}>Phone Number</Label>
                                        <Item style={styles.item}>
                                            <Input
                                                style={styles.inputLight}
                                                keyboardType='numeric'
                                                placeholder="PHONE NUMBER"
                                                keyboardType='numeric'
                                                placeholderTextColor='#fff'
                                                onChangeText={(text) => this.setState({ phonenumber: text })}
                                            />
                                        </Item>
                                        {image ?
                                            <Image source={{ uri: `${image}` }} style={{ height: 200, borderRadius: 20 }} />
                                            : null}
                                        <Item style={[styles.item, { justifyContent: 'flex-end' }]}>
                                            <Button style={styles.addbutton} rounded onPress={() => this.selectImage()}>
                                                <Text style={{ color: '#3b3b3b', fontWeight: 'bold' }}>ADD IMAGE</Text>
                                                <Icon name='image' type='FontAwesome' style={{ color: '#3d3d3d' }} />
                                            </Button>
                                        </Item>
                                        <Button
                                            rounded
                                            onPress={() => this.save()}
                                            style={styles.addbutton}
                                            success>
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

                            {/* MODAL EDIT */}
                            <Modal
                                isVisible={this.state.visibleE}
                                onSwipeComplete={() => this.setState({ visibleE: null })}
                                swipeDirection='down'
                                style={styles.modal}
                                hasBackdrop={false}
                                onBackButtonPress={() => this.setState({ visible: '' })}
                                onBackdropPress={()=> this.setState({ visible: '' })}
                                avoidKeyboard={true}
                            >
                                <Container style={styles.modalGeneral}>
                                    <Text style={styles.titleModal}>Edit Customer</Text>
                                    <Form style={{ marginTop: 10 }}>
                                        <Label style={styles.margin}>Name</Label>
                                        <Item style={styles.item}>
                                            <Input
                                                style={styles.inputLight}
                                                placeholderTextColor='#fff'
                                                defaultValue={isLoading == false ? this.state.data[0].name : null}
                                                onChangeText={(name) => this.setState({ name })}
                                            />
                                        </Item>
                                        <Label style={styles.margin}>ID Card</Label>
                                        <Item style={styles.item}>
                                            <Input
                                                style={styles.inputLight}
                                                placeholderTextColor='#fff'
                                                defaultValue={isLoading == false ? this.state.data[0].id_card : null}
                                                onChangeText={(text) => this.setState({ idcard: text })}

                                            />
                                        </Item>
                                        <Label style={styles.margin}>Phone Number</Label>
                                        <Item style={styles.item}>
                                            <Input
                                                style={styles.inputLight}
                                                placeholderTextColor='#fff'
                                                defaultValue={isLoading == false ? this.state.data[0].phone_number : null}
                                                onChangeText={(text) => this.setState({ phonenumber: text })}
                                            />
                                        </Item>

                                        {image ?
                                            <Image source={{ uri: `${image}` }} style={{ height: 200, borderRadius: 20 }} />
                                            : null}
                                        <Item style={[styles.item, { justifyContent: 'flex-end' }]}>
                                            <Button style={styles.addbutton} rounded onPress={() => this.selectImage()}>
                                                <Text style={{ color: '#3b3b3b', fontWeight: 'bold' }}>ADD IMAGE</Text>
                                                <Icon name='image' type='FontAwesome' style={{ color: '#3d3d3d' }} />
                                            </Button>
                                        </Item>
                                        <Button
                                            rounded
                                            onPress={() => this.saveEdit()}
                                            style={styles.addbutton}
                                            success>
                                            <Text style={{ color: '#3b3b3b', fontWeight: 'bold' }}>Save</Text>
                                            <Icon name='rightcircle' type='AntDesign' style={{ color: '#3d3d3d' }} />
                                        </Button>
                                    </Form>
                                    <Fab position='topRight' style={styles.btnclose}
                                        onPress={() => this.setState({ visibleE: '', isLoad: true })}
                                    >
                                        <Icon name='cross' type='Entypo' style={{ color: '#3d3d3d' }} />
                                    </Fab>
                                </Container>
                            </Modal>
                        </Container>
                    )
                }
                break;
        }
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
        AddCustomer: ({ formDataCustomer, token }) => dispatch(actionCustomer.handleAddCustomer({ formDataCustomer, token })),
        EditCustomer: (params) => dispatch(actionCustomer.handleEditCustomer(params)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CustomerScreen)