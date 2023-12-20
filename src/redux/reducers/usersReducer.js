import { usersActionTypes } from '../constants/users-actions-types';

const initialState = {
  allUsers: [],
  members: [],
  artists: [],
  currentUser: null,
  lazyListed: [],
  lazyOwned: [],
  currentUserId: null,
  collections: [],
  searchingArray: [],
};

export const usersReducer = (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case usersActionTypes.SET_ALL_USERS:
      return { ...state, allUsers: payload.allUsers };

    case usersActionTypes.SET_MEMBERS:
      return { ...state, members: payload.members };

    case usersActionTypes.SET_ARTISTS:
      return { ...state, artists: payload.artists };

    case usersActionTypes.SET_CURRENT_USER:
      return { ...state, currentUser: payload.currentUser };

    case usersActionTypes.SET_LAZY_LISTED:
      return { ...state, lazyListed: payload.lazyListed };

    case usersActionTypes.SET_LAZY_OWNED:
      return { ...state, lazyOwned: payload.lazyOwned };

    case usersActionTypes.SET_CURRENT_USER_ID:
      return { ...state, currentUserId: payload.currentUserId };

    case usersActionTypes.SET_COLLECTIONS:
      return { ...state, collections: payload.collections };

    case usersActionTypes.SET_SEARCHING_ARRAY: {
      const incomingArray = payload.searchingArray;
      const existingArray = state.searchingArray || [];
      // Merge unique values from existingArray and incomingArray
      const mergedArray = Array.from(new Set([...existingArray, ...incomingArray]));
      return { ...state, searchingArray: mergedArray };
    }

    case usersActionTypes.SET_SELECTED_USER:
      return state;

    default:
      return state;
  }
};
