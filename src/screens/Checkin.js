import React, { Component } from 'react'
// import * as actionSetting from './../redux/actions/actionSetting'
import { connect } from 'react-redux'
import { style } from './../component/styles'
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
    render() {
        return (
            <Container>
                <Text>Checkin</Text>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CheckinScreen)