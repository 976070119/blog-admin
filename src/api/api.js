import ajax from './axios';

//注册
export const reqRegister = (data) => ajax('/register', data, 'POST');

//登录
export const reqLogin = (data) => ajax('/login', data, 'POST');

//获取用户信息
export const reqGetUser = (data) => ajax('/getUser', data, 'GET');

//更新用户信息
export const reqUpdateUser = (data) => ajax('/updateUser', data, 'POST');

//发布文章
export const reqPublish = (data) => ajax('/publish', data, 'POST');


export const reqAddVisits = () => ajax('/v', {}, 'GET');

export const reqGetVisits = () => ajax('/visit', {}, 'GET');