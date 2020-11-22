import { combineReducers } from 'redux';
import { AUTH_SUCCESS, ERROR_MSG, RESET_USER, RECEIVE_USER } from './action-types';

const initUser = {
    userName: '',
    type: '',
    msg: ''
}

function user(state=initUser, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {...action.data};
        case AUTH_SUCCESS:
            return {...action.data};
        case AUTH_SUCCESS:
            return {...action.data};
        case AUTH_SUCCESS:
            return {...action.data};
        default:
            return state;
    }
}
export default combineReducers({
    user
})