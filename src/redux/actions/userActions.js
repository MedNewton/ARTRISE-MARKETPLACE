import {usersActionTypes} from '../constants/users-actions-types'


export const setCurrentUserId = (payload) => {
    return {
        type: usersActionTypes.SET_CURRENT_USER_ID,
        payload: payload
    }
}

export const setArtists = (payload) => {
    return {
        type: usersActionTypes.SET_ARTISTS,
        payload: payload
    }
}

export const setMembers = (payload) => {
    return {
        type: usersActionTypes.SET_MEMBERS,
        payload: payload
    }
}

export const setAllUsers = (payload) => {
    return {
        type: usersActionTypes.SET_ALL_USERS,
        payload: payload
    }
}

export const setCurrentUser = (payload) => {
    return {
        type: usersActionTypes.SET_CURRENT_USER,
        payload: payload
    }

}

export const setLazyListed = (payload) => {
    return {
        type: usersActionTypes.SET_LAZY_LISTED,
        payload: payload
    }
}

export const setLazyOwned = (payload) => {
    return {
        type: usersActionTypes.SET_LAZY_OWNED,
        payload: payload
    }
}

export const setCollections = (payload) => {
    return {
        type: usersActionTypes.SET_COLLECTIONS,
        payload: payload
    }
}