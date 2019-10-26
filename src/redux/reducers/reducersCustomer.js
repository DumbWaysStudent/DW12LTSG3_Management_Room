import * as types from './../types'

const initialState = {
    isLoading: true,
    isSuccess: false,
    isError: false,
    isLoadingA: true,
    isSuccessA: false,
    isErrorA: false,
    customer: []
}

export default function reducersCustomer(state = initialState, action) {
    switch (action.type) {
        case `${types.GET_ALL_CUSTOMER}_PENDING`:
            return {
                ...state,
                isLoading: true
            }
        case `${types.GET_ALL_CUSTOMER}_FULFILLED`:
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                customer: action.payload.data
            }
        case `${types.GET_ALL_CUSTOMER}_REJECTED`:
            return {
                ...state,
                isSuccess: false,
                isError: true
            }
        case `${types.ADD_CUSTOMER}_PENDING`:
            return {
                ...state,
                isLoadingA: true
            }
        case `${types.ADD_CUSTOMER}_FULFILLED`:
            return {
                ...state,
                isLoadingA: false,
                isSuccessA: true
            }
        case `${types.ADD_CUSTOMER}_REJECTED`:
            return {
                ...state,
                isSuccessA: false,
                isErrorA: true
            }
        case `${types.UPDATE_CUSTOMER}_PENDING`:
            return {
                ...state,
                isLoadingE: true
            }
        case `${types.UPDATE_CUSTOMER}_FULFILLED`:
            return {
                ...state,
                isLoadingE: false,
                isSuccessE: true,
                message: action.payload.data
            }
        case `${types.UPDATE_CUSTOMER}_REJECTED`:
            return {
                ...state,
                isSuccessE: false,
                isErrorE: true
            }
        default:
            return state
    }
}