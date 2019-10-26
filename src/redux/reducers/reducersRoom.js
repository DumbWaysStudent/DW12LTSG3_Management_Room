import * as types from './../types'

const initialState = {
    isLoading: true,
    isSuccess: false,
    isError: false,
    isLoadingA: true,
    isSuccessA: false,
    isErrorA: false,
    isLoadingE: true,
    isSuccessE: false,
    isErrorE: false,
    room: [],
    message: ''
}

export default function reducersRoom(state = initialState, action) {
    switch (action.type) {
        case `${types.GET_ALL_ROOM}_PENDING`:
            return {
                ...state,
                isLoading: true
            }
        case `${types.GET_ALL_ROOM}_FULFILLED`:
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                room: action.payload.data
            }
        case `${types.GET_ALL_ROOM}_REJECTED`:
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        case `${types.ADD_ROOM}_PENDING`:
            return {
                ...state,
                isLoadingA: true
            }
        case `${types.ADD_ROOM}_FULFILLED`:
            return {
                ...state,
                isLoadingA: false,
                isSuccessA: true,
                message: action.payload.data
            }
        case `${types.ADD_ROOM}_REJECTED`:
            return {
                ...state,
                isLoadingA: false,
                isErrorA: true
            }
        case `${types.UPDATE_ROOM}_PENDING`:
            return {
                ...state,
                isLoadingE: true
            }
        case `${types.UPDATE_ROOM}_FULFILLED`:
            return {
                ...state,
                isLoadingE: false,
                isSuccessE: true,
                message: action.payload.data
            }
        case `${types.UPDATE_ROOM}_REJECTED`:
            return {
                ...state,
                isLoadingE: false,
                isErrorE: true
            }
        default:
            return state
    }
}