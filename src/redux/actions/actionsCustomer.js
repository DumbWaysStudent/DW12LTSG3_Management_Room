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

export const handleAddCustomer = ({formDataCustomer, token}) => ({
    type: types.ADD_CUSTOMER,
    payload: Axios({
        method: 'post',
        url: `${API_URL}/api/v2/customer`,
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: formDataCustomer
    })
})

export const handleEditCustomer = ({id, formDataCustomer, token}) => ({
    type: types.UPDATE_CUSTOMER,
    payload: Axios({
        method: 'PATCH',
        url: `${API_URL}/api/v2/customer/${id}`,
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: formDataCustomer
    })
})