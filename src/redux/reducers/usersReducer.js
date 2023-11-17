import {usersActionTypes} from "../constants/users-actions-types";

const initialState = []

export const usersReducer = (state = initialState, {type, payload}) =>{
switch (type){
    case usersActionTypes.GET_USERS:
        return state
    case usersActionTypes.SET_USERS:
        return {...state, users:payload.users, artists:payload.artists}


    case usersActionTypes.GET_SELECTED_USER:
        return state

    case usersActionTypes.SET_SELECTED_USER:
        return state

    default:
        return state
}
}