import * as types from './../types'
import Axios from 'axios'
import {API_URL} from './../../component/host'

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
