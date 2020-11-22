import React, { useState, useEffect } from 'react';
import { Input, Button, Space } from 'antd';
import { connect } from 'react-redux';
import './login.less';

import { 
    EyeTwoTone,
    KeyOutlined, 
    UserOutlined, 
    EyeInvisibleOutlined, 
} from '@ant-design/icons';
import { login } from '../../redux/actions';

function Login(props) {

    const [userName, setUsername] = useState('');
    const [passWord, setPassword] = useState('');

    const handleLogin = () => {
        const data = {userName, passWord, remeber: true};
        props.login(data);
    }

    useEffect(() => {
        if(!props.user.success) return;
        if(props.user.success==='true') {
            props.history.replace('/');
        }
    }, [props.user]);

    return (
        <div className='login'>
            <div className='login-content'>
                <Space direction='vertical' align='center' size='middle'>
                    <h2>welcome to 后台管理系统</h2>
                    <Input 
                    placeholder="请输入账号" 
                    prefix={<UserOutlined />} 
                    allowClear={true} 
                    onChange={(val) => setUsername(val.target.value)}
                    />
                    <Input.Password
                        placeholder="请输入密码"
                        prefix={<KeyOutlined />}
                        onChange={(val) => setPassword(val.target.value)}
                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        onPressEnter={(e) => console.log(e)}
                    />
                    <Button type='primary' onClick={() => handleLogin()}>Login in</Button>
                </Space>
            </div>
        </div>
    )
}
export default connect(
    state => ({ user: state.user }),
    { login }
)(Login)