import { combineReducers } from 'redux';
import authReducer from './reducers/authReducer';
import generalReducer from "./reducers/generalReducer";

export default combineReducers({
    authReducer: authReducer,
    generalReducer: generalReducer
});
