import React, { useContext, useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import {
  Menu,
  Layout,
} from 'antd';
import {
  HomeOutlined,
  VideoCameraOutlined,
  LaptopOutlined,
  LogoutOutlined
} from '@ant-design/icons';

import { UserContext } from '../contexts/UserContext';

const Sider = () => {
  const { Sider } = Layout;

  const history = useHistory();

  const [, setUser] = useContext(UserContext);
  const [collapsed, setCollapsed] = useState(false);

  const handleCollapse = () => {
    setCollapsed(!collapsed);
  }

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user")
    history.push('/')
  }

  return (
    <Sider
      className="layout-content-slider"
      collapsible
      collapsed={collapsed}
      onCollapse={handleCollapse}
    >
      <div className="slider-logo" />
      <Menu
        theme="dark"
        mode="inline"
      >
        <Menu.Item
          icon={
            <HomeOutlined />
          }
        >
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item
          icon={
            <VideoCameraOutlined />
          }
        >
          <Link to="/movies">Movies</Link>
        </Menu.Item>
        <Menu.Item
          icon={
            <LaptopOutlined />
          }
        >
          <Link to="/games">Games</Link>
        </Menu.Item>
        <Menu.Item
          icon={
            <LogoutOutlined />
          }
        >
          <div onClick={handleLogout}>
            <Link to="/games"></Link>
            Logout
          </div>
        </Menu.Item>
      </Menu>
    </Sider>
  )
}

export default Sider;
