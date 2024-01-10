import { themeActionTypes } from '../constants/theme-actions-types';

const initialState = {
  theme: 'light',
};

export const themeReducer = (state = initialState, {
  type,
  payload
} = {}) => {
  switch (type) {
    case themeActionTypes.SET_THEME:
      return {
        ...state,
        theme: payload.theme
      };

    default:
      return state;
  }
};
