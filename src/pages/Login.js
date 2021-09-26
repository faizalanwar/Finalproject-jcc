import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import {
  Button,
  Input,
  Typography
} from "antd";

import { UserContext } from '../contexts/UserContext';

const { Title } = Typography;

const Login = () => {
  const history = useHistory();
  const [, setUser] = useContext(UserContext)
  const [input, setInput] = useState({
    username: "",
    password: "",
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    axios
      .post(
        "https://backendexample.sanbersy.com/api/user-login",
        {
          email: input.email,
          password: input.password
        }
      )
      .then(
        (res) => {
          var user = res.data.user;
          var token = res.data.token;
          var currentUser = {
            name: user.name,
            email: user.email,
            token
          }
          setUser(currentUser);
          localStorage.setItem("user", JSON.stringify(currentUser));
          history.push('/')
        }
      )
      .catch((err) => {
        alert(JSON.stringify(err.response.data))
      })
  }

  const handleChange = (event) => {
    let value = event.target.value;
    let name = event.target.name;
    setInput({
      ...input,
      [name]: value
    })
  }
  return (
    <>
      <div
        className="login-form-container"
      >
        <form
          className="login-form"
          onClick={handleSubmit}
        >
        <Title className="login-form-title">Login</Title>
          <div className="login-form-input">
            <label>Email: </label>
            <Input
              type="email"
              name="email"
              onChange={handleChange}
              value={input.email}
            />
          </div>
          <div className="login-form-input">
            <label>Password: </label>
            <Input
              type="password"
              name="password"
              onChange={handleChange}
              value={input.password}
            />
          </div>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </form>
      </div>
    </>
  )
}

export default Login;