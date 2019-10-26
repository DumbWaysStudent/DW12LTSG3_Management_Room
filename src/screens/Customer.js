import React, { Component } from 'react'
// import * as actionSetting from './../redux/actions/actionSetting'
import { connect } from 'react-redux'
import { styles } from './../component/styles'
import {
    FlatList,
    ActivityIndicator,
    TouchableOpacity 
} from 'react-native'
import {
    Container,
    Text,
    Button,
    Fab,
    Icon
} from 'native-base'

class SettingScreen extends Component {
    render() {
        return (
            <Container>
                <Text style={styles.title}>
                    Customers
                </Text>
                <FlatList
                    data={null}
                    renderItem={({item, index})=>(
                        <TouchableOpacity/>
                    )}
                />
                <Fab position='bottomRight'
                    onPress={()=> this.ShowAddModel()}
                >
                    <Icon name='ios-add'/>
                </Fab>
            </Container>
        )
    }
    ShowAddModel(){
        
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
)(SettingScreen)