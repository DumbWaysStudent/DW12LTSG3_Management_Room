import React, { Component } from 'react'
// import * as actionSetting from './../redux/actions/actionSetting'
import { connect } from 'react-redux'
import { styles } from './../component/styles'
import { FlatGrid } from 'react-native-super-grid'
import AsyncStorage from '@react-native-community/async-storage'
import * as actionOrder from './../redux/actions/actionsOrder'
import * as actionCustomer from './../redux/actions/actionsCustomer'
import {
    FlatList,
    ActivityIndicator,
    TouchableOpacity,
    View
} from 'react-native'
import {
    Container,
    Text,
    Button,
    Fab,
    Icon,
    Item,
    Left,
    ListItem,
    Input,
    Toast,
    Label,
    Form,
    Picker,

} from 'native-base'
import Modal from 'react-native-modal'
import moment from 'moment'
class CheckinScreen extends Component {
    constructor() {
        super()
        this.state = {
            showModalEdit: '',
            showModalOut: '',
            customerid: undefined,
            data: '',
            isLoad: true,
            isLoadC: true,
            token: '',
            roomid: '',
            duration: '',
            dataOrder: '',
            dataCustomer: '',
            datatimers: ''
        }
    }
    //----- Interval Order end time from now -----//
    timer = async () => {
        const { order } = this.props.order
        const orders = order.filter(function (item) {
            const items = item.is_booked == true
            return items
        })
        if (orders.length > 0) {
            const ordertime = orders.map(function (item) {
                const id = item.id
                const time = moment(item.orders[0]['order_end_time']).fromNow()
                return {
                    id,
                    time
                }
            })
            this.setState({
                datatimers: ordertime
            })
            const time = orders[0].orders[0]['order_end_time']
            const timeleft = moment(new Date(time)).fromNow()
            const last = moment(new Date(time))
            const now = moment(new Date())
            const log = last - now
            const condition = last < now
            const conditionBeta = timeleft == 'in a few seconds'
            switch (condition) {
                case true:
                    if (conditionBeta == true) {
                        this.showModalCheckout(orders[0].id)
                        await orders.splice(0, 1)
                    } else if (log < 0) {
                        const token = this.state.token
                        await this.props.CheckOut({
                            id: orders[0].orders[0]['id'],
                            roomid: orders[0]['id'],
                            token
                        })
                        await this.props.GetAllOrder(token)
                        await orders.splice(0, 1)
                    }
                    break;
            }
        }

    }
    componentDidMount = async () => {
        const token = await AsyncStorage.getItem('token')
        this.setState({
            token
        })
        await this.props.GetAllOrder(token)
        await this.props.GetAllCustomer(token)
        this.interval = setInterval(() => this.timer(), 1000)
    }
    componentWillUnmount() {
        clearInterval(this.interval)
    }
    //Modal Check In
    showModalCheckin = (e) => {
        const { order } = this.props.order
        const filter = order.filter(function (item) {
            const itemData = e == item.id
            return itemData
        })
        this.setState({
            data: filter,
            showModalEdit: 'bottom',
            isLoad: false,
            roomid: e
        })
    }
    //--- Modal Check Out ---//
    showModalCheckout = (e) => {
        const { order } = this.props.order
        const filter = order.filter(function (item) {
            const itemData = e == item.id
            return itemData
        })
        const customerid = filter[0].orders[0]['customer_id']
        const { customer } = this.props.customer
        const filterCustomer = customer.filter(function (item) {
            const itemData = customerid == item.id
            return itemData
        })
        this.setState({
            dataOrder: filter,
            dataCustomer: filterCustomer,
            showModalOut: 'bottom',
            isLoadC: false,
            roomid: e,
            customerid: customerid
        })
    }
    //--- Execute Check Out ---//
    checkout = async () => {
        const {
            token,
            dataOrder,
            roomid
        } = this.state
        await this.props.CheckOut({
            id: dataOrder[0]['id'],
            roomid,
            token
        })
        Toast.show({
            text: 'Please Wait ....',
            duration: 3000,
            style: { margin: 20, borderRadius: 10 }
        })
        this.setState({
            showModalOut: '',
            isLoadC: true
        })
        await this.props.GetAllOrder(token)
    }
    //--- Execute Check In ---//
    checkin = async () => {
        const {
            token,
            roomid,
            customerid,
            duration
        } = this.state
        await this.props.CheckInOrder({
            roomid: roomid,
            customerid: customerid,
            duration: duration,
            token: token
        })
        Toast.show({
            text: 'Please Wait ....',
            duration: 3000,
            style: { margin: 20, borderRadius: 10 }
        })
        this.setState({
            isLoad: true,
            showModalEdit: ''
        })
        await this.props.GetAllOrder(token)
    }
    //--- Picter ---//
    onValueChange2(value) {
        this.setState({
            customerid: value
        });
    }
    //--- Update Orders ---//
    onUpdate = () => {
        const token = this.state.token
        this.props.GetAllOrder(token)
    }
    render() {
        const { order, isLoading, isError } = this.props.order
        const { customer } = this.props.customer
        const { showModalEdit, showModalOut, data, isLoad, isLoadC, dataCustomer, dataOrder } = this.state
        switch (isLoading) {
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
                                    <Text style={styles.titleR}>Check In</Text>
                                </Left>
                            </ListItem>
                            {
                                order == '' ?
                                    <Text style={styles.nodata}>No result data</Text>
                                    :
                                    <FlatGrid
                                        refreshing={isLoading}
                                        onRefresh={this.onUpdate}
                                        itemDimension={130}
                                        items={order}
                                        style={styles.gridView}
                                        keyExtractor={(item, index) => index.toString()}
                                        renderItem={({ item, index }) => (
                                            <TouchableOpacity
                                                key={item.id}
                                                onPress={() => item.is_booked == true ? this.showModalCheckout(item.id) : this.showModalCheckin(item.id)}
                                            >
                                                <View style={[styles.itemContainer, { backgroundColor: item.is_booked == true ? '#4b4b4b' : '#2ecc71' }]}>
                                                    <Text style={styles.itemName}>{item.name}</Text>
                                                    <Text style={styles.itemCode}>{item.is_booked == true ? moment(new Date(item.orders[0]['order_end_time'])).fromNow() : null}</Text>
                                                </View>
                                            </TouchableOpacity>

                                        )}
                                    />
                            }


                            {/* MODAL CHECK IN  */}
                            <Modal
                                isVisible={showModalEdit}
                                onSwipeComplete={() => this.setState({ showModalEdit: '', isLoad: true })}
                                swipeDirection='down'
                                style={[styles.modal]}
                                animationOut='slideOutDown'
                                hasBackdrop={false}
                                onBackButtonPress={() => this.setState({ visible: '' })}
                                onBackdropPress={()=> this.setState({ visible: '' })}
                            >
                                <Container style={styles.modalGeneral}>
                                    <Text style={styles.titleModal}>Check In</Text>
                                    <Form style={{ marginTop: 10 }}>
                                        <Label style={styles.margin}>Room Name</Label>
                                        <Item style={styles.item}>
                                            <Input style={styles.inputLight}
                                                disabled
                                                defaultValue={isLoad == false ? data[0]['name'] : null}
                                            />
                                        </Item>
                                        <Label style={styles.margin}>Customer</Label>
                                        <Item picker style={[styles.item, { width: undefined, borderRadius: 20 }]}>
                                            <Picker
                                                mode="dropdown"
                                                style={[styles.colorWhite, { width: undefined, borderRadius: 20 }]}
                                                placeholder="Select Customer"
                                                placeholderStyle={{ color: "#fff" }}
                                                placeholderIconColor="#fff"
                                                selectedValue={this.state.customerid}
                                                onValueChange={this.onValueChange2.bind(this)}
                                            >
                                                {customer.map(function (item, index) {
                                                    return (
                                                        <Picker.Item key={item.id} label={item.name + ' ' + item.phone_number} value={item.id} />
                                                    )
                                                })}
                                            </Picker>
                                        </Item>
                                        <Label style={styles.margin}>Duration (minutes)</Label>
                                        <Item style={styles.item}>
                                            <Input style={styles.inputLight}
                                                keyboardType='numeric'
                                                onChangeText={(text) => this.setState({ duration: text })}
                                            />
                                        </Item>
                                        <Button rounded style={[styles.addbutton]} onPress={() => this.checkin()}>
                                            <Text style={{ color: '#3b3b3b', fontWeight: 'bold' }}>Check In</Text>
                                            <Icon name='rightcircle' type='AntDesign' style={{ color: '#3d3d3d' }} />
                                        </Button>
                                    </Form>
                                    <Fab position='topRight' style={styles.btnclose}
                                        onPress={() => this.setState({ showModalEdit: '', isLoad: true })}
                                    >
                                        <Icon name='cross' type='Entypo' style={{ color: '#3d3d3d' }} />
                                    </Fab>
                                </Container>
                            </Modal>

                            {/* MODAL CHECK OUT  */}
                            <Modal
                                isVisible={showModalOut}
                                onSwipeComplete={() => this.setState({ showModalOut: '', isLoadC: true })}
                                swipeDirection='down'
                                style={[styles.modal]}
                                animationOut='slideOutDown'
                                hasBackdrop={false}
                                onBackButtonPress={() => this.setState({ visible: '' })}
                                onBackdropPress={()=> this.setState({ visible: '' })}
                            >
                                <Container style={styles.modalGeneral}>
                                    <Text style={styles.titleModal}>Check Out</Text>
                                    <Form style={{ marginTop: 10 }}>
                                        <Label style={styles.margin}>Room Name</Label>
                                        <Item style={styles.item}>
                                            <Input style={styles.inputLight}
                                                disabled
                                                defaultValue={isLoadC == false ? dataOrder[0]['name'] : null}
                                            />
                                        </Item>
                                        <Label style={styles.margin}>Customer</Label>
                                        <Item picker style={styles.item}>
                                            <Input style={styles.inputLight}
                                                disabled
                                                defaultValue={isLoadC == false ? dataCustomer[0]['name'] : null}
                                            />
                                        </Item>
                                        <Label style={styles.margin}>Duration (minutes)</Label>
                                        <Item style={styles.item}>
                                            <Input style={styles.inputLight}
                                                disabled
                                            ><Text>{isLoadC == false ? moment(dataOrder[0].orders[0]['order_end_time']).fromNow() : null}</Text></Input>
                                        </Item>
                                        <Button rounded style={[styles.addbutton]} onPress={() => this.checkout()}>
                                            <Text style={{ color: '#3b3b3b', fontWeight: 'bold' }}>Check Out</Text>
                                            <Icon name='rightcircle' type='AntDesign' style={{ color: '#3d3d3d' }} />
                                        </Button>
                                    </Form>
                                    <Fab position='topRight' style={styles.btnclose}
                                        onPress={() => this.setState({ showModalOut: '', isLoadC: true })}
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
        order: state.order,
        customer: state.customer
    }
}

const mapDispatchToProps = dispatch => {
    return {
        GetAllOrder: (token) => dispatch(actionOrder.handleGetAllOrder(token)),
        GetAllCustomer: (token) => dispatch(actionCustomer.handleGetCustomer(token)),
        CheckInOrder: (params) => dispatch(actionOrder.handleAddOrder(params)),
        CheckOut: (params) => dispatch(actionOrder.handleEditOrder(params))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CheckinScreen)