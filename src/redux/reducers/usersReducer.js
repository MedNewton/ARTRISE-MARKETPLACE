import {usersActionTypes} from "../constants/users-actions-types";

const initialState = []

export const usersReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case usersActionTypes.SET_ALL_USERS:
            return {...state, allUsers: payload.allUsers}

        case usersActionTypes.SET_MEMBERS:
            return {...state, members: payload.members}

        case usersActionTypes.SET_ARTISTS:
            return {...state, artists: payload.artists}

        case usersActionTypes.SET_CURRENT_USER:
            return {...state, currentUser: payload.currentUser}

        case usersActionTypes.SET_LAZY_LISTED:
            return {...state, lazyListed: payload.lazyListed}

        case usersActionTypes.SET_LAZY_OWNED:
            return {...state, lazyOwned: payload.lazyOwned}

        case usersActionTypes.SET_CURRENT_USER_ID:
            return {...state, currentUserId: payload.currentUserId}

        case usersActionTypes.SET_SELECTED_USER:
            return state

        default:
            return state
    }
}