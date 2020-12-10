import {
    reqRegister,
    reqLogin,
    reqGetUser,
    reqUpdateUser,
    reqPublish,
    reqGetVisits,
    reqGetArticleList,
    reqSearchMusic,
    reqCheckMusic,
    reqMusicUrl,
    reqMusicLrc,
    reqDeleteArticle
} from '../api/api';
import { AUTH_SUCCESS, ERROR_MSG, RESET_USER, RECEIVE_USER, ARTICLE_LIST, MUSIC_INFO } from './action-types';
import { message } from 'antd';

const authSuccess = data => ({
    type: AUTH_SUCCESS,
    data
})
const errorMsg = data => ({
    type: ERROR_MSG,
    data
})
const resetUser = data => ({
    type: RESET_USER,
    data
})
const receiveUser = data => ({
    type: RECEIVE_USER,
    data
})
const articleList = data => ({
    type: ARTICLE_LIST,
    data
})
const musicInfo = (i, data) => ({
    type: MUSIC_INFO,
    data: {
        result: i===1 ? data : null,
        check: i===2 ? data : null,
        url: i===3 ? data : null,
        lrc: i===4 ? data : null,
    }
})
//注册
export const register = data => {
    return async dispatch => {
        const res = await reqRegister(data);
        if (res.data.code === 0) {
            dispatch(authSuccess(res.data));
        } else {
            dispatch(errorMsg(res.data));
            return message.error('获取失败！');
        }
    }
}

//登录
export const login = data => {
    const {userName,passWord } = data;
    return async dispatch => {
        if (!userName) {
            return message.warn('请填写账号！');
        } else if (!passWord) {
            return message.warn('请填写密码！');
        }
        const res = await reqLogin(data);
        if (res.data.code === 0) {
            dispatch(authSuccess(res.data));
            return message.info('登录成功！');
        } else if (res.data.code === -1){
            dispatch(errorMsg(res.data));
            return message.warn('账号不存在！');
        } else if (res.data.code === 1){
            dispatch(errorMsg(res.data));
            return message.warn('密码错误！');
        }
    }
}

//获取数据
export const getUser = () => {
    return async dispatch => {
        const res = await reqGetUser();
        if (res.data.code === 0) {
            dispatch(authSuccess(res.data));
        } else {
            dispatch(errorMsg(res.data));
            return message.error('获取失败！');
        }
    }
}

//更新数据
export const updateUser = data => {
    const { avatar, nickName, birthday, motto } = data;
    return async dispatch => {
        if (!avatar) {
            return message.warn('请选择头像！');
        } else if (!nickName) {
            return message.warn('请填写昵称！');
        } else if (!birthday) {
            return message.warn('请填写生日！');
        } else if (!motto) {
            return message.warn('请填写座右铭！');
        }
        const res = await reqUpdateUser(data);
        if (res.data.code === 0) {
            dispatch(authSuccess(res.data));
            return message.info('保存成功！');
        } else {
            dispatch(errorMsg(res.data));
            return message.info('保存失败，请稍后尝试...');
        }
    }
}

export const getVisits = () => {
    return async dispatch => {
        const res = await reqGetVisits();
        if (res.data.code === 0) {
            dispatch(authSuccess(res.data));
        } else {
            dispatch(errorMsg(res.data));
            return message.error('获取失败！');
        }
    }
}

export const publish = data => {
    const { title, desc, content, tags} = data;
    return async dispatch => {
        if(!title) {
            return message.warn('请输入标题！');
        } else if(!desc) {
            return message.warn('请输入描述！');
        } else if(!tags) {
            return message.warn('请输入标签！');
        } else if(!content) {
            return message.warn('请输入内容！');
        }
        const res = await reqPublish(data);
        if (res.data.code === 0) {
            // dispatch(articleList(res.data));
            return message.info('发布成功！');
        } else {
            dispatch(errorMsg(res.data));
            return message.error('发布失败！');
        }
    }
}

export const getArticleList = () => {
    return async dispatch => {
        const res = await reqGetArticleList();
        if (res.data.code === 0) {
            dispatch(articleList(res.data));
        } else {
            dispatch(errorMsg(res.data));
            return message.error('获取失败！');
        }
    }
}

export const deleteArticle = (_id) => {
    return async dispatch => {
        const res = await reqDeleteArticle(_id);
        console.log(res)
        if (res.data.code === 0) {
            return message.error('删除成功！');
        } else {
            dispatch(errorMsg(res.data));
            return message.error('获取失败！');
        }
    }
}

export const searchMusic = (data) => {
    const {keywords} = data;
    return async dispatch => {
        if(!keywords) {
            return message.warn('不能为空！');
        }
        const res = await reqSearchMusic(data);
        if(res.data.code===200) {
            return dispatch(musicInfo(1, res.data.result));
        } else {
            return message.error('获取失败！');
        }
    }
}
export const checkMusic = (data) => {
    return async dispatch => {
        const res = await reqCheckMusic(data);
            if(res.data.message==='ok') {
                return dispatch(musicInfo(2, res.data));
            } else {
                dispatch(errorMsg(2, res.data));
                return message.error('获取失败！');
            }
    }
}
export const musicUrl = (data) => {
    return async dispatch => {
        const res = await reqMusicUrl(data);
        if(res.data.code===200) {
            return dispatch(musicInfo(3, res.data.data));
        } else {
            return message.error('获取失败！');
        }
    }
}
export const musicLrc = (data) => {
    return async dispatch => {
        const res = await reqMusicLrc(data);
        if(res.data.code===200) {
            return dispatch(musicInfo(4, res.data));
        } else {
            return message.error('获取失败！');
        }
    }
}