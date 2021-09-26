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

const MovieView = () => {
  const history = useHistory();
  const { id } = useParams();
  const [movie, setMovie] = useState({
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
        setMovie({
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

  function callback(key) {
    console.log(key);
  }

  const handleButton = (event) => {
    history.push('/')
  }

  return (
    <div className="movie-view-container">
      <Button
        className="movie-view-return"
        onClick={handleButton}
        size="large"
      >
        <LeftOutlined />
      </Button>
      <Title>{movie.title} ({movie.year})</Title>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane className="movie-view-information" tab="Information" key="1">
          <div className="movie-view-information-img">
            <Image width="100%" src={movie.image_url}></Image>
          </div>
          <div className="movie-view-information-info">
            <Descriptions title="Movie Info">
              <Descriptions.Item label="Title">{movie.title}</Descriptions.Item>
              <Descriptions.Item label="Year">{movie.year}</Descriptions.Item>
              <Descriptions.Item label="Duration">{movie.duration}</Descriptions.Item>
              <Descriptions.Item label="Genre">{movie.genre}</Descriptions.Item>
              <Descriptions.Item label="Rating">{movie.rating}/10</Descriptions.Item>
            </Descriptions>
          </div>
        </TabPane>
        <TabPane className="movie-view-description" tab="Description" key="2">
          <Title level={3}>Description</Title>
          {movie.description}
        </TabPane>
        <TabPane className="movie-view-review" tab="Review" key="3">
          <Title level={3}>Review</Title>
          {movie.review}
        </TabPane>
      </Tabs>
    </div>
  )
}

export default MovieView;