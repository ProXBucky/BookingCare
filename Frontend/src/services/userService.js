import axios from '../axios';

const handleLoginAPI = (email, password) => {
    return axios.post('/api/login', { email, password })
}

const getAllUser = (userId) => {
    return axios.get(`/api/get-all-users?id=${userId}`)
}

const createUserService = (data) => {
    return axios.post('/api/create-new-user', data)
}

const deleteUserService = (userId) => {
    return axios.delete('/api/delete-user', {
        data: { id: userId }
    })
}

const editUserService = (data) => {
    return axios.put('/api/edit-user', data)
}

const getAllCodes = (typeId) => {
    return axios.get(`/api/allcodes?type=${typeId}`)
}

const getTopDoctorService = (limit) => {
    return axios.get(`/api/get-top-doctor?limit=${limit}`)
}

const getAllDoctorService = () => {
    return axios.get('/api/get-all-doctor')
}

const postInfoDoctorService = (data) => {
    return axios.post('/api/post-info-doctor', data)
}

const getDetailDoctorByIdService = (id) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${id}`)
}

const createBulkSchedule = (data) => {
    return axios.post('/api/bulk-create-schedule', data)
}

const getScheduleByDoctorIdAndTime = (id, date) => {
    return axios.get(`/api/get-schedule-doctor-by-doctorid-and-date?id=${id}&date=${date}`)
}

export {
    handleLoginAPI, getAllUser, createUserService,
    deleteUserService, editUserService, getAllCodes,
    getTopDoctorService, getAllDoctorService, postInfoDoctorService,
    getDetailDoctorByIdService, createBulkSchedule, getScheduleByDoctorIdAndTime
}