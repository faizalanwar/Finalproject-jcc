import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import axios from 'axios';
import {
  Button,
  Input,
  Radio,
  Typography
} from 'antd';

import { UserContext } from '../contexts/UserContext';

const { Title } = Typography;

const GamesForm = () => {
  const { id } = useParams();
  const history = useHistory();
  const [user,] = useContext(UserContext);
  let token = user ? user.token : null;
  const [input, setInput] = useState({
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
          image_url
        } = result.data;
        setInput({
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
    fetchData()
  }, [id])

  const handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    setInput({
      ...input,
      [name]: value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (id) {
      axios
        .put(
          `https://backendexample.sanbersy.com/api/data-game/${id}`,
          input,
          {
            headers: {
              "Authorization": "Bearer" + token
            }
          }
        )
        .then(
          () => {
            history.push('/games')
          }
        )
        .catch(
          error => {
            console.log(error.message);
          }
        )
    } else {
      axios
        .post(
          'https://backendexample.sanbersy.com/api/data-game',
          input,
          {
            headers: {
              "Authorization": "Bearer" + token
            }
          }
        )
        .then(
          () => {
            history.push('/games')
          }
        )
        .catch(
          error => {
            console.log(error.message);
          }
        )
    }
    setInput({
      name: "",
      genre: "",
      singlePlayer: true,
      multiplayer: false,
      platform: "",
      release: "",
      image_url: ""
    })
  }

  const handleButton = (event) => {
    history.push('/games')
  }

  return (
    <div className="games-form-container">
      <Title>Game Form</Title>
      <Button
        className="games-form-return-btn"
        onClick={handleButton}
      >
        Return
      </Button>
      <form
        className="games-form"
        onSubmit={handleSubmit}
      >
        <div className="games-form-input">
          <label>Name: </label>
          <Input
            type="text"
            name="name"
            onChange={handleChange}
            value={input.name}
            required
          />
        </div>
        <div className="games-form-input">
          <label>Genre: </label>
          <Input
            type="text"
            name="genre"
            onChange={handleChange}
            value={input.genre}
            required
          />
        </div>
        <div className="games-form-input">
          <label>Singleplayer: </label>
          <Radio.Group
            name="singlePlayer"
            onChange={handleChange}
            value={input.singlePlayer}
          >
            <Radio value={1}>True</Radio>
            <Radio value={0}>False</Radio>
          </Radio.Group>
        </div>
        <div className="games-form-input">
          <label>Multiplayer: </label>
          <Radio.Group
            name="multiplayer"
            onChange={handleChange}
            value={input.multiplayer}
          >
            <Radio value={1}>True</Radio>
            <Radio value={0}>False</Radio>
          </Radio.Group>
        </div>
        <div className="games-form-input">
          <label>Platform: </label>
          <Input
            type="text"
            name="platform"
            onChange={handleChange}
            value={input.platform}
            required
          />
        </div>
        <div className="games-form-input">
          <label>Release: </label>
          <Input
            type="text"
            name="release"
            onChange={handleChange}
            value={input.release}
            required
          />
        </div>
        <div className="games-form-input">
          <label>Image URL (Max 250 characters): </label>
          <Input.TextArea
            type="text"
            name="image_url"
            maxLength="250"
            onChange={handleChange}
            value={input.image_url}
            required
          />
        </div>
        <button>Submit</button>
      </form>
    </div>
  )

}

export default GamesForm;