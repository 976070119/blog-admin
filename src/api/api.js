import ajax from './axios';

//注册
export const reqRegister = (data) => ajax('/register', data, 'POST');

//登录
export const reqLogin = (data) => ajax('/login', data, 'POST');

//获取用户信息
export const reqGetUser = () => ajax('/getUser', {}, 'GET');

//更新用户信息
export const reqUpdateUser = (data) => ajax('/updateUser', data, 'POST');

//发布文章
export const reqPublish = (data) => ajax('/publish', data, 'POST');

//获取文章
export const reqGetArticleList = () => ajax('/articleList', {}, 'GET');

//删除文章
export const reqDeleteArticle = (_id) => ajax('/deleteArt', {_id}, 'POST');

export const reqAddVisits = () => ajax('/v', {}, 'GET');

export const reqGetVisits = () => ajax('/visit', {}, 'GET');

const url = '//47.100.39.25:3000';

export const reqSearchMusic = (data) => ajax(url + '/search', data, 'GET'); //keywords

export const reqCheckMusic = (data) => ajax(url + '/check/music', data, 'GET'); //id

export const reqMusicUrl = (data) => ajax(url + '/song/url', data, 'GET'); // https://music.163.com/song/media/outer/url?id=id.mp3

export const reqMusicLrc = (data) => ajax(url + '/lyric', data, 'GET'); //id

export const reqMusicPic = (data) => ajax(url + '/album', data, 'GET'); //id

