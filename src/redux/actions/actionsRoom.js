import * as types from './../types'
import Axios from 'axios'
import { API_URL } from '../../component/host'

export const handleGetAllRoom = (token) => ({
    type: types.GET_ALL_ROOM,
    payload: Axios({
        method: 'get',
        url: `${API_URL}/api/v2/rooms`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
})

export const handleAddRoom = (params) => ({
    type: types.ADD_ROOM,
    payload: Axios({
        method: 'post',
        url: `${API_URL}/api/v2/room`,
        headers:{
            Authorization: `Bearer ${params.token}`
        },
        data: {
            name: params.name
        }
    })
})

export const handleUpdateRoom = (params) =>({
    type: types.UPDATE_ROOM,
    payload: Axios({
        method: 'put',
        url: `${API_URL}/api/v2/room/${params.id}`,
        headers:{
            Authorization: `Bearer ${params.token}`
        },
        data: {
            name: params.name
        }
    })
})