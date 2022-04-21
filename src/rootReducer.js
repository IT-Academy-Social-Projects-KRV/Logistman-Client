import { combineReducers } from 'redux';
import authReducer from './reducers/authReducer';

export default combineReducers({
    authReducer: authReducer
});
