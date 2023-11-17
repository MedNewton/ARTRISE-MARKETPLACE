import {usersActionTypes} from '../constants/users-actions-types'

export const getUsers =(users) =>{
    return {
        type: usersActionTypes.GET_USERS,
        payload: users
    }
}

export const setUsers =(payload) =>{
    return {
        type: usersActionTypes.SET_USERS,
        payload: payload
    }
}

export const getSelectedUser = (user) =>{
    return {
        type: usersActionTypes.GET_SELECTED_USER,
        payload:user
    }
}

export const setSelectedUser = (user) => {
    return {
        type: usersActionTypes.SET_SELECTED_USER,
        payload:user
    }
}