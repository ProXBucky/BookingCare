import actionTypes from './actionTypes';
import { getAllCodes, createUserService, getAllUser, deleteUserService } from '../../services/userService';
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


