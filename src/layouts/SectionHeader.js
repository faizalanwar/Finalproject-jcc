import React, { useContext } from 'react';
import {
  Typography,
  Layout
} from 'antd'
import { UserContext } from '../contexts/UserContext';

const { Header } = Layout;
const { Title } = Typography;

const SectionHeader = () => {
  const [user,] = useContext(UserContext);

  return (
    <Header className="layout-content-header">
      {
        user ?
          <>
            <div className="content-header-left">
              <Title level={3}
                className="content-header-welcome"
              >
                Database
            </Title>
            </div>
            <div className="content-header-right">
              <Title level={3}
                className="content-header-welcome"
              >
                Welcome, {user.name}
              </Title>
            </div>
          </>
          :
          <>
            <Title level={3}
              className="content-header-welcome"
            >
              Database
            </Title>
          </>
      }
    </Header>
  )
}

export default SectionHeader;