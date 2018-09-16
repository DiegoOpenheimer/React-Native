import http from './http'

export const createAccount = user => http.post('users/new', user)