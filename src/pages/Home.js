import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import {
  Button,
  Typography,
} from 'antd';

import { UserContext } from '../contexts/UserContext';
import MoviesTable from './MoviesTable';
import GamesTable from './GamesTable';

const { Title } = Typography;

const Home = () => {
  const [user,] = useContext(UserContext);
  const history = useHistory();

  const handlePassword = () => {
    history.push('/change-password')
  }

  const handleLogin = () => {
    history.push('/login')
  }

  const handleRegister = () => {
    history.push('/register')
  }

  return (
    <div className="home-container">
      {
        user ?
          <>
            <div className="home-main">
              <Title>
                Hello, what would you like to do?
              </Title>
              <Button
                className="home-btn"
                onClick={handlePassword}
              >
                Change Password
              </Button>
            </div>
            <div className="home-tables">
              <MoviesTable />
              <GamesTable />
            </div>
          </>
          :
          <>
            <div className="home-buttons">
              <div className="home-main">
                <Title>
                  Welcome, please login or register
              </Title>
                <Button
                  className="home-btn"
                  onClick={handleLogin}
                >
                  Login
              </Button>
                <Button
                  className="home-btn"
                  onClick={handleRegister}
                >
                  Register
              </Button>
              </div>
              <div className="home-tables">
                <MoviesTable />
                <GamesTable />
              </div>
            </div>
          </>
      }
    </div>
  )
}

export default Home;