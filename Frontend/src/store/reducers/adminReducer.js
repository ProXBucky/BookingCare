import actionTypes from '../actions/actionTypes';

const initialState = {
    genders: [],
    positions: [],
    roles: [],
    users: [],
    isLoadingRedux: '',
    topDoctors: [],
    doctors: [],
    doctorInfo: {}
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_FIRST:
            console.log('fetch gender first')
            state.isLoadingRedux = true
            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            console.log('fetch gender success')
            state.genders = action.data;
            state.isLoadingRedux = false
            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_FAILED:
            console.log('fetch gender fail')
            state.isLoadingRedux = false
            return {
                ...state,
            }

        case actionTypes.FETCH_ROLE_FIRST:
            console.log('fetch ROLE first')
            state.isLoadingRedux = true
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            console.log('fetch ROLE success')
            state.roles = action.data;
            state.isLoadingRedux = false
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_FAILED:
            console.log('fetch ROLE fail')
            state.isLoadingRedux = false
            return {
                ...state,
            }

        case actionTypes.FETCH_POSITION_FIRST:
            console.log('fetch POSITION first')
            state.isLoadingRedux = true
            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_SUCCESS:
            console.log('fetch POSITION success')
            state.isLoadingRedux = false
            state.positions = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_FAILED:
            console.log('fetch POSITION fail')
            state.isLoadingRedux = false
            return {
                ...state,
            }

        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            console.log('fetch all user success')
            state.users = action.user;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_USERS_FAILED:
            console.log('fetch all user fail')
            return {
                ...state,
            }
        case actionTypes.DELETE_USER_SUCCESS:
            console.log('delete user success')
            return {
                ...state,
            }
        case actionTypes.DELETE_USER_FAILED:
            console.log('delete  user fail')
            return {
                ...state,
            }

        case actionTypes.EDIT_USER_SUCCESS:
            console.log('EDIT user success')
            return {
                ...state,
            }
        case actionTypes.EDIT_USER_FAILED:
            console.log('EDIT  user fail')
            return {
                ...state,
            }
        case actionTypes.GET_TOP_DOCTOR_SUCCESS:
            console.log('get top doctor success')
            state.topDoctors = action.data
            return {
                ...state,
            }
        case actionTypes.GET_TOP_DOCTOR_FAILED:
            console.log('get  top doctor fail')
            return {
                ...state,
            }
        case actionTypes.GET_ALL_DOCTOR_SUCCESS:
            console.log('get ALL doctor success')
            state.doctors = action.data
            return {
                ...state,
            }
        case actionTypes.GET_ALL_DOCTOR_FAILED:
            console.log('get ALL doctor fail')
            return {
                ...state,
            }
        case actionTypes.GET_INFO_DOCTOR_SUCCESS:
            console.log('get INFO doctor success')
            state.doctorInfo = action.data
            return {
                ...state,
            }
        case actionTypes.GET_INFO_DOCTOR_FAILED:
            console.log('get INFO doctor fail')
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default adminReducer;