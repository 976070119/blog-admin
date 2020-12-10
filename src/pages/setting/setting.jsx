import React, { useState, useEffect } from 'react';
import { Image, Upload, message, DatePicker, Space, Avatar, Input, Button } from 'antd';
import { LoadingOutlined, PlusOutlined, UserOutlined, UploadOutlined } from '@ant-design/icons';
import './setting.less';
import { connect } from 'react-redux';
import { updateUser } from '../../redux/actions';
import moment from 'moment';
import axios from 'axios';

const dateFormat = 'YYYY-MM-DD';
function Setting(props) {

    // axios.get('/visit')
    //     .then(res => {
    //         console.log(res.data.data.visits)
    //     })
    // const data = { title: 'title', desc: 'desc', content: 'content', tags: [1,2,3] };
    // const data = { userName: 'root', passWord: '1234', type: 'guest' };
    // axios.post('/register', data)
    // .then( res => {
    //   console.log(res.data)
    // })

    const [avatar, setAvatar] = useState('');
    const [nickName, setNickName] = useState('');
    const [birthday, setBirthday] = useState(null);
    const [motto, setMotto] = useState('');

    useEffect(() => {
        if(window.userinfo) {
          const { avatar, nickName, birthday, motto } = window.userinfo;
          setAvatar(avatar);
          setNickName(nickName);
          setBirthday(birthday);
          setMotto(motto);
        }
    }, [window.userinfo])

    function handleChange(date) {
        if (!date.file.response) return;
        setAvatar(date.file.response.src);
    }
    function nickNameSelector(date) {
        setNickName(date.target.value);
    }
    function dateSelector(date, dateString) {
        setBirthday(dateString);
    }
    function mottoSelector(date) {
        setMotto(date.target.value);
    }
    function update() {
        const data = {avatar, nickName, birthday, motto};
        props.updateUser(data);
        window.s = true;
    }


    return (
        <div>
            <Space direction="vertical" size={'middle'}>
                <Space>
                    头像：
                    <Space align="end">
                        <Avatar shape="square" size={84} icon={<UserOutlined />} src={avatar} />
                        <Upload
                            name="avatar"
                            method="post"
                            listType="text"
                            className="avatar-uploader"
                            showUploadList={false}
                            action="/upload"
                            onChange={handleChange}
                        >
                            <Button icon={<UploadOutlined />}>上传头像</Button>
                        </Upload>
                    </Space>
                </Space>
                <Space>昵称：<Input allowClear={true} placeholder="输入昵称" onChange={nickNameSelector} value={nickName}/></Space>
                <Space>生日：<DatePicker allowClear={true} placeholder='选择日期' onChange={dateSelector} value={ birthday ? moment(birthday, dateFormat) : undefined }/></Space>
                <Space>座右铭：<Input allowClear={true} placeholder="" onChange={mottoSelector} value={motto}/></Space>
                <Button type='primary' onClick={update}>保存</Button>
            </Space>
        </div>
    )
}
export default connect (
    state => ({ user: state.user }),
    { updateUser }
)(Setting);