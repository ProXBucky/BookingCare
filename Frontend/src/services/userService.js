import axios from '../axios';

const handleLoginAPI = (email, password) => {
    return axios.post('/api/login', { email, password })
}

const getAllUser = (userId) => {
    return axios.get(`/api/get-all-users?id=${userId}`)
}

export { handleLoginAPI, getAllUser }