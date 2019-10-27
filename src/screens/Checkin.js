import React, { Component } from 'react'
// import * as actionSetting from './../redux/actions/actionSetting'
import { connect } from 'react-redux'
import { styles } from './../component/styles'
import { FlatGrid } from 'react-native-super-grid'
import AsyncStorage from '@react-native-community/async-storage'
import * as actionOrder from './../redux/actions/actionsOrder'
import {
    FlatList,
    ActivityIndicator
} from 'react-native'
import {
    Container,
    Text,
    Button
} from 'native-base'

class CheckinScreen extends Component {
    componentDidMount = async () => {
        const token = await AsyncStorage.getItem('token')
        this.setState({
            token
        })
        this.props.GetAllOrder(token)
    }
    render() {
        console.log(this.props.order.order)
        return (
            <Container>
                <Text style={styles.title}> Checkin</Text>
                {/* <FlatGrid
                    itemDimension={130}
                    items={null}
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
                /> */}
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        order: state.order
    }
}

const mapDispatchToProps = dispatch => {
    return {
        GetAllOrder: (token)=> dispatch(actionOrder.handleGetAllOrder(token))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CheckinScreen)