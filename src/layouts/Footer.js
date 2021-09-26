import React from 'react';
import {
  Layout,
} from 'antd';


class Footer extends React.Component {
  render() {
    const { Footer } = Layout;
    
    return (
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Faizalanwar</Footer>
    )
  }
}

export default Footer;