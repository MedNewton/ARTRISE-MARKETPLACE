import { usersActionTypes } from '../constants/users-actions-types';

export const setCurrentUserId = (payload) => ({
  type: usersActionTypes.SET_CURRENT_USER_ID,
  payload,
});

export const setArtists = (payload) => ({
  type: usersActionTypes.SET_ARTISTS,
  payload,
});

export const setMembers = (payload) => ({
  type: usersActionTypes.SET_MEMBERS,
  payload,
});

export const setAllUsers = (payload) => ({
  type: usersActionTypes.SET_ALL_USERS,
  payload,
});

export const setCurrentUser = (payload) => ({
  type: usersActionTypes.SET_CURRENT_USER,
  payload,
});

export const setLazyListed = (payload) => ({
  type: usersActionTypes.SET_LAZY_LISTED,
  payload,
});

export const setLazyOwned = (payload) => ({
  type: usersActionTypes.SET_LAZY_OWNED,
  payload,
});

export const setCollections = (payload) => ({
  type: usersActionTypes.SET_COLLECTIONS,
  payload,
});

export const setSearchingArray = (payload) => ({
  type: usersActionTypes.SET_SEARCHING_ARRAY,
  payload,
});
