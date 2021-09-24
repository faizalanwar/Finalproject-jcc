import React from 'react';
import {
  Layout,
} from 'antd';


class Footer extends React.Component {
  render() {
    const { Footer } = Layout;
    
    return (
      <Footer
        className="layout-content-footer"
        style={{
          textAlign: 'center'
        }}
      >
        Faizalanwar
      </Footer>
    )
  }
}

export default Footer;