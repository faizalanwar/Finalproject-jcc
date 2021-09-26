import React, { useContext } from 'react';
import { Link, useHistory } from "react-router-dom";


import { Layout, Menu } from 'antd';
import {UnlockOutlined , AppstoreOutlined,SettingOutlined, LaptopOutlined, NotificationOutlined , LogoutOutlined} from '@ant-design/icons';
import { UserContext } from '../contexts/UserContext';

const { SubMenu } = Menu;

const Sider = () => {
  const { Sider } = Layout;

  const history = useHistory();

  const [, setUser] = useContext(UserContext);
 

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user")
    history.push('/')
  }
  const handleChangePassword = () => {
    history.push('/change-password')
  }

  return (
    <Sider className="site-layout-background" width={200}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%' }}
          >
            <Menu.Item icon={<AppstoreOutlined/>}><Link to="/">Dashboard</Link></Menu.Item>
            <SubMenu key="sub1" icon={<NotificationOutlined />} title="Movies">
              <Menu.Item key="1"><Link to="/movies">Movie Data</Link></Menu.Item>
              <Menu.Item key="2"><Link to="/movies/create">Create Movie Data</Link></Menu.Item>
             
            </SubMenu>
            <SubMenu key="sub2" icon={<LaptopOutlined />} title="Games">   
              <Menu.Item key="1"><Link to="/games">Games Data</Link></Menu.Item>
              <Menu.Item key="2"><Link to="/games/create">Create Games Data</Link></Menu.Item>
              
            </SubMenu>
            <SubMenu key="sub3" title="Settings" icon={<SettingOutlined />}>
            <Menu.Item key="9" icon={<UnlockOutlined />}> 
                <div onClick={handleChangePassword}>
                  <Link to="/change-password"></Link>
                  Change Password
                </div>
              </Menu.Item>
           
              <Menu.Item key="9" icon={<LogoutOutlined />}> 
                <div onClick={handleLogout}>
                  <Link to="/games"></Link>
                  Logout
                </div>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
)
}

export default Sider;
