import * as types from './../types'

const initialState = {
    isLoading: true,
    isSuccess: false,
    isError: false,
    customer: []
}

export default function reducersCustomer(state = initialState, action){
    switch(action.type){
        case `${types.GET_ALL_CUSTOMER}_PENDING`:
            return {
                ...state,
                isLoading: true
            }
        case `${types.GET_ALL_CUSTOMER}_FULFILLED`:
            return {
                ...state,
                isLoading: false,
                isSuccess: true
            }
        case `${types.GET_ALL_CUSTOMER}_REJECTED`:
            return {
                ...state,
                isSuccess: false,
                isError: true
            }
        default :
            return state
    }
}