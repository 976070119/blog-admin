import { combineReducers } from 'redux';
import { AUTH_SUCCESS, ERROR_MSG, RESET_USER, RECEIVE_USER, ARTICLE_LIST, MUSIC_INFO } from './action-types';

const initUser = {
    userName: '',
    type: '',
    msg: ''
}
const initMusic = {
    avatar: '',
    name: '',
    singer: '',
    album: '',
}

function data(state, action) {
    switch (action.type) {
        case ARTICLE_LIST:
            return {...action.data};
        case ERROR_MSG:
            return {...action.data};
        default:
            return {...state};
    }
}
function user(state=initUser, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {...action.data};
        case ERROR_MSG:
            return {...action.data};
        default:
            return {...state};
    }
}
function music(state=initMusic, action) {
    // console.log({...action.data}, 'reducer')
    switch (action.type) {
        case MUSIC_INFO:
            return action.data;
        case ERROR_MSG:
            return {...action.data};
        default:
            return {...state};
    }

}
export default combineReducers({
    data, user, music
})