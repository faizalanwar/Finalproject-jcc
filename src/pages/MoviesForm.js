import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import axios from 'axios';
import {
  Button,
  Input,
  Typography
} from 'antd';

import { UserContext } from '../contexts/UserContext';

const { Title } = Typography;

const MoviesForm = () => {
  const { id } = useParams();
  const history = useHistory();
  const [user,] = useContext(UserContext);
  let token = user ? user.token : null;
  const [input, setInput] = useState({
    title: "",
    description: "",
    year: 1980,
    duration: 0,
    genre: "",
    rating: 0,
    review: "",
    image_url: ""
  })

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const result = await axios
          .get(
            `https://backendexample.sanbersy.com/api/data-movie/${id}`
          )
        const {
          title,
          description,
          year,
          duration,
          genre,
          rating,
          review,
          image_url
        } = result.data;
        setInput({
          title,
          description,
          year,
          duration,
          genre,
          rating,
          review,
          image_url
        })
      }
    }
    fetchData();
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
          `https://backendexample.sanbersy.com/api/data-movie/${id}`,
          input,
          {
            headers: {
              "Authorization": "Bearer" + token
            }
          }
        )
        .then(
          () => {
            history.push('/movies')
          }
        )
        .catch(
          (err) => {
            alert(JSON.stringify(err.response.data));
          }
        )
    } else {
      axios
        .post(
          'https://backendexample.sanbersy.com/api/data-movie',
          input,
          {
            headers: {
              "Authorization": "Bearer" + token
            }
          }
        )
        .then(
          () => {
            history.push('/movies')
          }
        )
        .catch(
          (err) => {
            alert(JSON.stringify(err.response.data));
          }
        )
    }
    setInput({
      title: "",
      description: "",
      year: 1980,
      duration: 0,
      genre: "",
      rating: 0,
      review: "",
      image_url: ""
    })
  }

  const handleButton = (event) => {
    history.push('/movies')
  }

  return (
    <div className="movies-form-container">
      <Title>Movie Form</Title>
      <Button
        className="movies-form-return-btn"
        onClick={handleButton}
      >
        Return
      </Button>
      <form
        className="movies-form"
        onSubmit={handleSubmit}
      >
        <div className="movies-form-input">
          <label>Title: </label>
          <Input
            type="text"
            name="title"
            onChange={handleChange}
            value={input.title}
            required
          />
        </div>
        <div className="movies-form-input">
          <label>Description: </label>
          <Input
            type="text"
            name="description"
            onChange={handleChange}
            value={input.description}
            required
          />
        </div>
        <div className="movies-form-input">
          <label>Year: </label>
          <Input
            type="number"
            min="1980"
            name="year"
            onChange={handleChange}
            value={input.year}
            required
          />
        </div>
        <div className="movies-form-input">
          <label>Duration: </label>
          <Input
            type="number"
            min="60"
            name="duration"
            onChange={handleChange}
            value={input.duration}
            required
          />
        </div>
        <div className="movies-form-input">
          <label>Genre: </label>
          <Input
            type="text"
            name="genre"
            onChange={handleChange}
            value={input.genre}
            required
          />
        </div>
        <div className="movies-form-input">
          <label>Rating: </label>
          <Input
            type="number"
            min="0"
            max="10"
            name="rating"
            onChange={handleChange}
            value={input.rating}
            required
          />
        </div>
        <div className="movies-form-input">
          <label>Review: </label>
          <Input
            type="text"
            name="review"
            onChange={handleChange}
            value={input.review}
            required
          />
        </div>
        <div className="movies-form-input">
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

export default MoviesForm;