import axios from 'axios'
import store from '../reducers/index'

const TIMEOUT_REQUEST = 10 //seconds

const instance = axios.create({
    baseURL: 'https://alunos.b7web.com.br/apis/devstagram/',
    timeout: TIMEOUT_REQUEST * 1000
})

instance.interceptors.request.use((config) => {
    const { auth } = store.getState()
    if (auth.jwt) {
        config.headers.Authorization = jwt
    }
    return config
})

export default instance

