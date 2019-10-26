import * as types from './../types'
import { API_URL } from './../../component/host'
import Axios from 'axios'

export const handleLogin = (params) => ({
    type: types.LOGIN,
    payload: Axios({
        method: 'POST',
        url: `${API_URL}/api/v2/login`,
        data: {
            email: params.email,
            password: params.password
        }
    })
})


