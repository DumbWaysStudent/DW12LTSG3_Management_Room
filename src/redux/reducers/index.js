import { combineReducers } from 'redux'
import { createNavigationReducer } from 'react-navigation-redux-helpers'

//Navigasi
import RootNavigator from './../../navigator'

const reducerRouter = createNavigationReducer(RootNavigator)
//Login
import reducerUser from './../reducers/reducersUser'
//Romo
import reducerRoom from './../reducers/reducersRoom'

const appReducer = combineReducers({
    router: reducerRouter,
    users: reducerUser,
    room: reducerRoom
})

export default appReducer