import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import axios from 'axios';
import {
  Button,
  Descriptions,
  Image,
  Tabs,
  Typography
} from "antd";
import {
  LeftOutlined
} from '@ant-design/icons';

const { TabPane } = Tabs;
const { Title } = Typography;

const GameView = () => {
  const history = useHistory();
  const { id } = useParams();
  const [game, setGame] = useState({
    name: "",
    genre: "",
    singlePlayer: true,
    multiplayer: false,
    platform: "",
    release: "",
    image_url: ""
  })

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const result = await axios
          .get(
            `https://backendexample.sanbersy.com/api/data-game/${id}`
          )
        const {
          name,
          genre,
          singlePlayer,
          multiplayer,
          platform,
          release,
          image_url
        } = result.data;
        setGame({
          name,
          genre,
          singlePlayer,
          multiplayer,
          platform,
          release,
          image_url
        })
      }
    }
    fetchData();
  }, [id])

  function callback(key) {
    console.log(key);
  }

  const handleButton = (event) => {
    history.push('/')
  }

  return (
    <div className="game-view-container">
      <Button
        className="game-view-return"
        onClick={handleButton}
        size="large"
      >
        <LeftOutlined />
      </Button>
      <Title>{game.name}</Title>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane className="game-view-information" key="1">
          <div className="game-view-information-img">
            <Image width="240px" src={game.image_url}></Image>
          </div>
          <div className="game-view-information-info">
            <Descriptions title="Game Info">
              <Descriptions.Item label="Name">{game.name}</Descriptions.Item>
              <Descriptions.Item label="Release">{game.release}</Descriptions.Item>
              <Descriptions.Item label="Genre">{game.genre}</Descriptions.Item>
              <Descriptions.Item label="Platform">{game.platform}</Descriptions.Item>
              <Descriptions.Item label="Single Player">
                {
                  (game.singlePlayer === 1) ? "Yes" :
                    (game.singlePlayer === 0) ? "No" :
                      "Data if false"
                }
              </Descriptions.Item>
              <Descriptions.Item label="Multiplayer">
                {
                  (game.multiplayer === 1) ? "Yes" :
                    (game.multiplayer === 0) ? "No" :
                      "Data if false"
                }
              </Descriptions.Item>
            </Descriptions>
          </div>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default GameView;