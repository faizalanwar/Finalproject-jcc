import React, { useContext } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Layout } from 'antd';

import Sider from './Sider';
import SectionHeader from './SectionHeader';
import Section from './Section';
import Footer from './Footer';

import { UserContext } from '../contexts/UserContext';


const Main = () => {
  const { Content } = Layout;

  const [user, ] = useContext(UserContext);

  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        {
          user ? <Sider /> : <> </>
        }
        <Layout className="layout">
          <Content className="layout-content-content">
            <SectionHeader />
            <Section />
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </Router>
  )
}

export default Main;