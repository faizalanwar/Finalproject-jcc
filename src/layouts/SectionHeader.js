import React, { useContext } from 'react';
import {
  Menu
} from 'antd'
import {QuestionCircleOutlined,HomeOutlined,LoginOutlined ,UserAddOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";

import { UserContext } from '../contexts/UserContext';



const SectionHeader = () => {

  const [user,] = useContext(UserContext);


  const LeftStyle = {
    position: 'relative',
    display: 'flex',
    justifyContent: 'left',
  }
  const rightStyle = {position: 'absolute', top: 0, right: 0}


  return (
    <div>
      {
        user ?
          <>
            <Menu  mode='horizontal' style={LeftStyle}>
              <Menu.Item>Halo , {user.name}</Menu.Item>
            </Menu>
            <Menu  mode='horizontal' style={rightStyle}>
              {/* <Menu.Item key="1">About this App</Menu.Item> */}
            <Menu.Item   mode='horizontal' icon={<QuestionCircleOutlined/>}><Link to="/about">About this App</Link></Menu.Item>

            </Menu>
          
        
       
          </>
          :
          <>

            <Menu  mode='horizontal' style={LeftStyle}>
             <Menu.Item   mode='horizontal' icon={<HomeOutlined />}><Link to="/">Home</Link></Menu.Item>
             <Menu.Item   mode='horizontal' icon={<LoginOutlined />}><Link to="/login">Login</Link></Menu.Item>
             <Menu.Item   mode='horizontal' icon={<UserAddOutlined />}><Link to="/register">Register</Link></Menu.Item>
            </Menu>
            <Menu mode='horizontal' style={rightStyle}>
              <Menu.Item   mode='horizontal' icon={<QuestionCircleOutlined/>}><Link to="/about">About this App</Link></Menu.Item>
            </Menu>
          </>
      }
    </div>
  )
}

export default SectionHeader;