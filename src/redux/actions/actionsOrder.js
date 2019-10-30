import * as types from './../types'
import Axios from 'axios'
import { API_URL } from './../../component/host'

export const handleGetAllOrder = (token) => ({
    type: types.GET_ALL_ORDER,
    payload: Axios({
        method: 'GET',
        url: `${API_URL}/api/v2/checkin`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
})

export const handleAddOrder = (params) => ({
    type: types.ADD_ORDER,
    payload: Axios({
        method: 'POST',
        url: `${API_URL}/api/v2/checkin`,
        headers: {
            Authorization: `Bearer ${params.token}`
        },
        data: {
            room_id: params.roomid,
            customer_id: params.customerid,
            is_done: false,
            is_booked: true,
            duration: params.duration,
            order_end_time: new Date(),
            createdAt: new Date(),
            updatedAt: new Date()
        }
    })
})

export const handleEditOrder = (params) => ({
    type: types.UPDATE_ORDER,
    payload: Axios({
        method: 'delete',
        url: `${API_URL}/api/v2/checkin/${params.id}`,
        headers: {
            Authorization: `Bearer ${params.token}`
        },
        data: {
            room_id: params.roomid
        }
    })
})