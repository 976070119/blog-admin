import React, { useState, useEffect } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { Layout, Menu, Avatar } from 'antd';
import './main.less';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  ContainerOutlined,
  HomeOutlined
} from '@ant-design/icons';
import Index from '../index/index';
import Writer from '../writer/writer';
import Article from '../article/article';
import Setting from '../setting/setting';
import { getUser } from '../../redux/actions';
import { connect } from 'react-redux';

const { Header, Sider, Content } = Layout;

function Main(props) {

  const [index, setIndex] = useState(localStorage.getItem('i'));
  const [avatar, setAvatar] = useState('');
  const [nickName, setNickName] = useState('admin');
  const [collapsed, setCollapsed] = useState(false);
  const [marginLeft, setMarginLeft] = useState(200);

  const toggle = () => {
    setCollapsed(!collapsed);
    setMarginLeft(collapsed ? 200 : 80);
  }

  const menuSelector = (val) => {
    setIndex(val.key);
    localStorage.setItem('i', val.key);
  }

  useEffect(() => {
    props.getUser();
  }, []);

  useEffect(() => {
    if (props.user.data) {
      window.userinfo = props.user.data
      const { avatar, nickName } = props.user.data;
      setAvatar(avatar);
      setNickName(nickName);
    };
  }, [props.user, window.s]);

  const hoverEnter = (e) => {
    e.target.style.animation = 'avatarMove .3s linear 1.5s infinite';
  }

  const hoverLeave = (e) => {
    setTimeout(() => {
      e.target.style.animation = 'avatarMove 0s linear 1s infinite';
    }, 500);
  }

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
        }}>
        <div className="logo">
          <Avatar shape="square" onMouseOver={hoverEnter} onMouseOut={hoverLeave} size={84} icon={<UserOutlined />} src={avatar} />
          <span className='username'>{nickName}</span>
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={[index]} onClick={menuSelector}>
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to='/index'>主页</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<ContainerOutlined />}>
            <Link to='/writer'>发布文章</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<ContainerOutlined />}>
            <Link to='/article'>文章列表</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<UserOutlined />}>
            <Link to='/setting'>设置</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout" style={{ marginLeft }}>
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: toggle,
          })}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 'calc(100vh - 64px - 48px)',
          }}
        >
          <Switch>
            <Route path='/index' component={Index} />
            <Route path='/writer' component={Writer} />
            <Route path='/article' component={Article} />
            <Route path='/setting' component={Setting} />
          </Switch>
        </Content>
      </Layout>
    </Layout>
  )
}
export default connect(
  state => ({ user: state.user }),
  { getUser }
)(Main)