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

const MoviesTable = () => {
  const history = useHistory();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
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
    fetchData();
  }, []);

  const handleView = (event) => {
    let id = event.target.value;
    history.push(`/movies/view/${id}`)
  }

  return (
    <div className="home-tables-movies">
      <Title level={3}>Movie Data</Title>
      <Table
        className="movies-table"
        dataSource={movies}
        pagination={{ pageSize: 10 }}
      >
        <Column title="ID" dataIndex="id" key="id" />
        <Column title="Title" dataIndex="title" key="title" />
        <Column title="Year" dataIndex="year" key="year" />
        <Column title="Duration" dataIndex="duration" key="duration" />
        <Column title="Genre" dataIndex="genre" key="genre" />
        <Column title="Rating" dataIndex="rating" key="rating" />
        <Column
          title="Action"
          key="action"
          render={(text, record) => (
            <Space size="middle">
              <button onClick={handleView}value={record.id}>View</button>
            </Space>
          )}
        />
      </Table>
    </div>
  )
}

export default MoviesTable;