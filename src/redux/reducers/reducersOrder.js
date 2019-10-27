import * as types from './../types'

const initialState = {
    isLoading: true,
    isSuccess: false,
    isError: false,
    order: [],
    message: ''
}

export default function reducersOrders(state = initialState, action){
    switch(action.type){
        case `${types.GET_ALL_ORDER}_PENDING`:
            return {
                ...state,
                isLoading: true
            }
        case `${types.GET_ALL_ORDER}_FULFILLED`:
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                order: action.payload.data
            }
        case `${types.GET_ALL_ORDER}_REJECTED`:
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        default :  
            return state
    }
}