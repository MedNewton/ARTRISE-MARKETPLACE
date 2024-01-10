import { combineReducers } from 'redux';
import { usersReducer } from './usersReducer';
import { themeReducer } from './themeReducer';

const reducers = combineReducers({ usersReducer, themeReducer });

export default reducers;
