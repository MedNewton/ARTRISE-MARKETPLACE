import { themeActionTypes } from '../constants/theme-actions-types';

export const setAppTheme = (payload) => ({
  type: themeActionTypes.SET_THEME,
  payload,
});
