import actionTypes from './actionTypes';
import {
    getAllCodes, createUserService, getAllUser, deleteUserService,
    editUserService, getTopDoctorService, getAllDoctorService,
    postInfoDoctorService, getDetailDoctorByIdService
} from '../../services/userService';
import { toast } from 'react-toastify';

// Export gender, role, position
export const fetchGenderFirst = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_FIRST })
            let res = await getAllCodes("GENDER");
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data))
            } else {
                dispatch(fetchGenderFailed())
            }
        } catch (e) {
            dispatch(fetchGenderFailed())
        }
    }
}

export const fetchGenderSuccess = (dataTmp) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: dataTmp
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})

export const fetchRoleFirst = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_ROLE_FIRST })

            let res = await getAllCodes("ROLE");
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data))
            } else {
                dispatch(fetchRoleFailed())
            }
        } catch (e) {
            dispatch(fetchRoleFailed())
        }
    }
}

export const fetchRoleSuccess = (dataTmp) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: dataTmp
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})

export const fetchPositionFirst = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_POSITION_FIRST })

            let res = await getAllCodes("POSITION");
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data))
            } else {
                dispatch(fetchPositionFailed())
            }
        } catch (e) {
            dispatch(fetchPositionFailed())
        }
    }
}

export const fetchPositionSuccess = (dataTmp) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: dataTmp
})

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})

//Post new user
export const postNewUser = (dataTmp) => {
    return async (dispatch, getState) => {
        try {
            let res = await createUserService(dataTmp)
            if (res && res.errCode === 0) {
                dispatch(postNewUserSuccess())
                dispatch(fetchAllUser())
                toast.success('Create new user success <3')
            } else {
                console.log(res)
                dispatch(postNewUserFailed())
                toast.error('Create new user failed <3')
            }
        } catch (e) {
            console.log('error from admin actions redux', e)
            toast.error('Create new user failed <3')
            dispatch(postNewUserFailed())
        }
    }
}

export const postNewUserSuccess = () => ({
    type: actionTypes.POST_NEW_USER_SUCCESS
})

export const postNewUserFailed = () => ({
    type: actionTypes.POST_NEW_USER_FAILED
})


//Get all user 
export const fetchAllUser = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUser('ALL')
            if (res && res.errCode === 0) {
                dispatch(fetchAllUserSuccess(res.user))
            } else {
                console.log(res)
                dispatch(fetchAllUserFailed())
            }
        } catch (e) {
            console.log('error from admin actions redux', e)
            dispatch(fetchAllUserFailed())
        }
    }
}

export const fetchAllUserSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    user: data,
})

export const fetchAllUserFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS
})


// delete user in the table
export const deleteUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId)
            if (res && res.errCode === 0) {
                toast.success('Delete user success <3')
                dispatch(deleteUserSuccess())
                dispatch(fetchAllUser())
            } else {
                toast.error('Delete user failed <3')
                dispatch(deleteUserFailed())
            }
        } catch (e) {
            toast.error('Delete user failed <3')
            console.log('error from admin actions redux', e)
            dispatch(deleteUserFailed())

        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
})

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})

export const editUserRedux = (user) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(user)
            if (res && res.errCode === 0) {
                toast.success('EDIT user success <3')
                dispatch(editUserSuccess())
                dispatch(fetchAllUser())
            } else {
                toast.error('EDIT user failed <3')
                dispatch(editUserFailed())
            }
        } catch (e) {
            toast.error('EDIT user failed <3')
            dispatch(editUserFailed())

        }
    }
}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})

export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED
})

export const getTopDoctor = (limit) => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorService(limit);
            if (res && res.errCode === 0) {
                dispatch(getTopDoctorSuccess(res.data))
                console.log('get top doctor success')
            } else {
                dispatch(getTopDoctorFailed())
                console.log('get top doctor failed')

            }
        } catch (e) {
            dispatch(getTopDoctorFailed())
            console.log('get top doctor failed')

        }
    }
}

export const getTopDoctorSuccess = (data) => ({
    type: actionTypes.GET_TOP_DOCTOR_SUCCESS,
    data: data
})

export const getTopDoctorFailed = () => ({
    type: actionTypes.GET_TOP_DOCTOR_FAILED
})

export const fetchAllDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctorService();
            if (res && res.errCode === 0) {
                dispatch(getAllDoctorSuccess(res.data))
                console.log('get all doctor success')
            } else {
                dispatch(getAllDoctorFailed())
                console.log('get all doctor failed')

            }
        } catch (e) {
            dispatch(getAllDoctorFailed())
            console.log('get all doctor failed')

        }
    }
}

export const getAllDoctorSuccess = (data) => ({
    type: actionTypes.GET_ALL_DOCTOR_SUCCESS,
    data: data
})

export const getAllDoctorFailed = () => ({
    type: actionTypes.GET_ALL_DOCTOR_FAILED
})


export const postInfoDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await postInfoDoctorService(data)
            if (res && res.errCode === 0) {
                toast.success('Add information success')
                console.log('get top doctor success')
                dispatch(postInforDoctorSuccess())
            } else {
                toast.error('Add information failed')
                console.log('get top doctor failed with errCode', res)
                dispatch(postInforDoctorFailed())
            }
        } catch (e) {
            dispatch(postInforDoctorFailed())
            toast.error('Add information failed')
            console.log('get top doctor failed', e)

        }
    }
}

export const postInforDoctorSuccess = (data) => ({
    type: actionTypes.POST_INFO_DOCTOR_SUCCESS,
})

export const postInforDoctorFailed = () => ({
    type: actionTypes.POST_INFO_DOCTOR_FAILED
})






