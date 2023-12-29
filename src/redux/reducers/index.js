import {combineReducers} from 'redux';
import {usersReducer} from './usersReducer';

const reducers = combineReducers ({usersReducer})

export default reducers;