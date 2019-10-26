import * as types from './../types'
import Axios from 'axios'
import { API_URL } from '../../component/host'

export const handleGetCustomer = (token) => ({
    type: types.GET_ALL_CUSTOMER,
    payload: Axios({
        method: 'get',
        url: `${API_URL}/api/v2/customers`,
        headers: {
            Authorization: `Bearer ${token}`
        },
    })
})

export const handleAddCustomer = (params) => ({
    type: types.ADD_CUSTOMER,
    payload: Axios({
        method: 'post',
        url: `${API_URL}/api/v2/customer`,
        headers: {
            Authorization: `Bearer ${params.token}`
        },
        data: {
            name: params.name,
            id_card: params.id_card,
            phone_number: params.phone_number,
            image: params.image,
        }
    })
})

export const handleEditCustomer = (params) => ({
    type: types.UPDATE_CUSTOMER,
    payload: Axios({
        method: 'put',
        url: `${API_URL}/api/v2/customer/${params.id}`,
        headers: {
            Authorization: `Bearer ${params.token}`
        },
        data: {
            name: params.name,
            id_card: params.id_card,
            phone_number: params.phone_number,
            image: params.image,
        }
    })
})