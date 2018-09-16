import http from './http'

export const createAccount = user => http.post('users/new', user)
export const requestLogin = user => http.post('users/login', user)