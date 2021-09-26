import React, { useContext } from 'react';
import {  Typography} from 'antd';

import { UserContext } from '../contexts/UserContext';
import MoviesTable from './MoviesTable';
import GamesTable from './GamesTable';

const { Title } = Typography;

const Home = () => {
  const [user,] = useContext(UserContext);
 
  return (
    <div className="home-container">
      {
        user ?
          <>
         
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