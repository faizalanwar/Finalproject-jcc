import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import {
  Button,
  Divider,
  Descriptions,
  Image,
  Input,
  Modal,
  Table,
  Typography,
  Space,
} from 'antd';

import { UserContext } from '../contexts/UserContext';

const { Column } = Table;
const { Title } = Typography;

const Movies = () => {
  const history = useHistory();
  const [user,] = useContext(UserContext);
  let token = user ? user.token : null;
  const [movies, setMovies] = useState([]);
  const [visible, setVisible] = useState(false);
  const [id, setId] = useState(null)
  const [search, setSearch] = useState("")
  const [view, setView] = useState({
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
      console.log(id)
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
        setView({
          title,
          description,
          year,
          duration,
          genre,
          rating,
          review,
          image_url
        })
      } else {
        const result = await axios
          .get(
            'https://backendexample.sanbersy.com/api/data-movie'
          )
        setMovies(
          result.data.map(movie => {
            return {
              id: movie.id,
              title: movie.title,
              description: movie.description,
              year: movie.year,
              duration: movie.duration,
              genre: movie.genre,
              rating: movie.rating,
              review: movie.review,
              image_url: movie.image_url
            }
          })
        )
      }
    }
    fetchData();
  }, [id])

  const handleAdd = (event) => {
    history.push('/movies/create')
  }

  const handleEdit = (event) => {
    let id = event.target.value;
    history.push(`/movies/edit/${id}`)
  }

  const handleDelete = (event) => {
    let id = parseInt(event.target.value)
    console.log(id)
    axios
      .delete(
        `https://backendexample.sanbersy.com/api/data-movie/${id}`,
        {
          headers: {
            "Authorization": "Bearer" + token
          }
        }
      )
      .then(
        () => {
          let theMovie = movies.filter(
            el => {
              return el.id !== id
            }
          )
          setMovies(theMovie);
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
          'https://backendexample.sanbersy.com/api/data-movie'
        )
        .then(res => {
          let result = res.data.map(movie => {
            return {
              id: movie.id,
              title: movie.title,
              description: movie.description,
              year: movie.year,
              duration: movie.duration,
              genre: movie.genre,
              rating: movie.rating,
              review: movie.review,
              image_url: movie.image_url
            }
          })
          let filteredMovies = result.filter(
            x => x.title.toLowerCase().indexOf(search.toLowerCase()) !== -1
          )
          setMovies([...filteredMovies])
        })
    }
    setSearch('')
  }

  return (
    <div className="movies-container">
      <Title>Movie List</Title>
      <Button
        className="movies-add-btn"
        onClick={handleAdd}
      >
        Add New Movie
      </Button>
      <div className="movies-search">
        <Input.Search
          allowClear
          className="movies-search-bar"
          value={search}
          onChange={handleSearch}
          onSearch={submitSearch}
        />
      </div>
      <Table
        className="movies-table"
        dataSource={movies}
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
          title="Title"
          dataIndex="title"
          key="title"
          sorter={
            (a, b) => a.title.length - b.title.length
          }
        />
        <Column
          title="Year"
          dataIndex="year"
          key="year"
          sorter={
            (a, b) => a.year - b.year
          }
        />
        <Column
          title="Duration"
          dataIndex="duration"
          key="duration"
          sorter={
            (a, b) => a.duration - b.duration
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
          title="Rating"
          dataIndex="rating"
          key="rating"
          sorter={
            (a, b) => a.rating - b.rating
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
        className="movie-card"
        title={view.title + " (" + view.year + ")"}
        visible={visible}
        onOk={handleClose}
        onCancel={handleClose}
      >
        <div className="movie-card-detail">
          <Image width={240} src={view.image_url} />
          <Descriptions title="Movie Info">
            <Descriptions.Item label="Rating">{view.rating}/10</Descriptions.Item>
            <Descriptions.Item label="Duration">{view.duration}</Descriptions.Item>
            <Descriptions.Item></Descriptions.Item>
            <Descriptions.Item label="Genre">{view.genre}</Descriptions.Item>
          </Descriptions>
          <Divider>Description</Divider>
          <p>
            {view.description}
          </p>
          <Divider>Review</Divider>
          <p>
            {view.review}
          </p>
        </div>
      </Modal>
    </div>
  )
}

export default Movies;