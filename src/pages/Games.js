import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import {
  Button,
  Descriptions,
  Image,
  Input,
  Modal,
  Table,
  Typography,
  Space,
} from "antd";

import { UserContext } from '../contexts/UserContext';

const { Column } = Table;
const { Title } = Typography;

const Games = () => {
  const history = useHistory();
  const [user,] = useContext(UserContext);
  let token = user ? user.token : null;
  const [games, setGames] = useState([]);
  const [visible, setVisible] = useState(false);
  const [id, setId] = useState(null)
  const [search, setSearch] = useState("")
  const [view, setView] = useState({
    name: "",
    genre: "",
    singlePlayer: true,
    multiplayer: false,
    platform: "",
    release: "",
    image_url: "",
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
          image_url,
        } = result.data;
        setView({
          name,
          genre,
          singlePlayer,
          multiplayer,
          platform,
          release,
          image_url,
        })
      } else {
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
    }
    fetchData();
  }, [id])

  const handleAdd = (event) => {
    history.push('/games/create')
  }

  const handleEdit = (event) => {
    let id = parseInt(event.target.value)
    history.push(`/games/edit/${id}`)
  }

  const handleDelete = (event) => {
    let id = parseInt(event.target.value);
    axios
      .delete(
        `https://backendexample.sanbersy.com/api/data-game/${id}`,
        {
          headers: {
            "Authorization": "Bearer " + token
          }
        }
      )
      .then(
        () => {
          let theGame = games.filter(
            el => {
              return el.id !== id
            }
          )
          setGames(theGame)
        }
      )
      .catch(
        (err) => {
          alert(JSON.stringify(err.response.data));
        }
      )
  }

  const handleView = (event) => {
    let getId = event.target.value;
    setId(getId)
    setVisible(true)
  }

  const handleClose = () => {
    setId(null)
    setVisible(false);
  }

  const handleSearch = (event) => {
    let searchItem = event.target.value
    setSearch(searchItem)
  }

  const submitSearch = (event) => {
    if (search !== null) {
      axios
        .get(
          'https://backendexample.sanbersy.com/api/data-game'
        )
        .then(res => {
          let result = res.data.map(game => {
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
          let filteredGames = result.filter(
            x => x.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
          )
          setGames([...filteredGames])
        })
    }
    setSearch('')
  }

  return (
    <>
      {
        games !== null &&
        (
          <div className="games-container">
            <Title>Game List</Title>
            <Button
              className="games-add-btn"
              onClick={handleAdd}
            >
              Add New Game
            </Button>
            <div className="games-search">
              <Input.Search
                allowClear
                className="games-search-bar"
                value={search}
                onChange={handleSearch}
                onSearch={submitSearch}
              />
            </div>
            <Table
              className="games-table"
              dataSource={games}
              pagination={{ pageSize: 5 }}
            >
              <Column
                title="ID"
                dataIndex="id"
                key="id"
                sorter={
                  (a, b) => a.id - b.id
                }
              />
              <Column
                title="Name"
                dataIndex="name"
                key="name"
                sorter={
                  (a, b) => a.name.length - b.name.length
                }
              />
              <Column
                title="Genre"
                dataIndex="genre"
                key="genre"
                sorter={
                  (a, b) => a.genre.length - b.genre.length
                }
              />
              <Column
                title="Singleplayer"
                dataIndex="singlePlayer"
                key="singlePlayer"
                sorter={
                  (a, b) => a.singlePlayer - b.singlePlayer
                }
              />
              <Column
                title="Multiplayer"
                dataIndex="multiplayer"
                key="multiplayer"
                sorter={
                  (a, b) => a.multiplayer - b.multiplayer
                }
              />
              <Column
                title="Platform"
                dataIndex="platform"
                key="platform"
                sorter={
                  (a, b) => a.platform.length - b.platform.length
                }
              />
              <Column
                title="Release"
                dataIndex="release"
                key="release"
                sorter={
                  (a, b) => a.release - b.release
                }
              />
              <Column
                title="Action"
                key="action"
                render={(text, record) => (
                  <Space size="middle">
                    <button onClick={handleEdit} value={record.id}>Edit</button>
                    <button onClick={handleDelete} value={record.id}>Delete</button>
                    <button onClick={handleView} value={record.id}>View</button>
                  </Space>
                )}
              />
            </Table>
            <Modal
              className="game-card"
              title={view.name + " (" + view.release + ")"}
              visible={visible}
              onOk={handleClose}
              onCancel={handleClose}
            >
              <div className="game-card-detail">
                <Image width={240} src={view.image_url} />
                <Descriptions title="Game Info">
                  <Descriptions.Item label="Single Player">
                    {view.singlePlayer === 1 ? "Yes" : "No"}
                  </Descriptions.Item>
                  <Descriptions.Item label="Multiplayer">
                    {view.multiplayer === 1 ? "Yes" : "No"}
                  </Descriptions.Item>
                  <Descriptions.Item label="Genre">{view.genre}</Descriptions.Item>
                  <Descriptions.Item label="Platform">{view.platform}</Descriptions.Item>
                </Descriptions>
              </div>
            </Modal>
          </div>
        )
      }
    </>
  )

}

export default Games