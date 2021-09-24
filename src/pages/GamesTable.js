import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import {
  Table,
  Typography,
  Space,
} from 'antd';

const { Column } = Table;
const { Title } = Typography;

const GamesTable = () => {
  const history = useHistory();
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios
        .get(
          'https://backendexample.sanbersy.com/api/data-game'
        )
      setGames(
        result.data.map(game => {
          return {
            id: game.id,
            name: game.name,
            genre: game.genre,
            singlePlayer: game.singlePlayer,
            multiplayer: game.multiplayer,
            platform: game.platform,
            release: game.release,
            image_url: game.image_url,
          }
        })
      )
    }
    fetchData();
  }, [])

  const handleView = (event) => {
    let id = event.target.value;
    history.push(`/games/view/${id}`)
  }

  return (
    <div className="home-tables-games">
      <Title level={3}>Game List</Title>
      <Table
        className="games-table"
        dataSource={games}
        pagination={{ pageSize: 5 }}
      >
        <Column title="ID" dataIndex="id" key="id" />
        <Column title="Name" dataIndex="name" key="name" />
        <Column title="Genre" dataIndex="genre" key="genre" />
        <Column title="Release" dataIndex="release" key="release" />
        <Column
          title="Action"
          key="action"
          render={(text, record) => (
            <Space size="middle">
              <button onClick={handleView} value={record.id}>View</button>
            </Space>
          )}
        />
      </Table>
    </div>
  )
}

export default GamesTable;