import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import {
  Button,
  Input,
  Typography
} from "antd";

import { UserContext } from '../contexts/UserContext';

const { Title } = Typography;

const Register = () => {
  const history = useHistory();
  const [, setUser] = useContext(UserContext)
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: ""
  })

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("https://backendexample.sanbersy.com/api/register", {
        name: input.name,
        email: input.email,
        password: input.password
      })
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
        alert(JSON.stringify(err.response.data));
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
        className="register-form-container"
      >
        <form
          className="register-form"
          onSubmit={handleSubmit}
        > <Title className="register-form-title">Register</Title>
          <div className="register-form-input">
            <label>Name: </label>
            <Input
              type="text"
              name="name"
              onChange={handleChange}
              value={input.name}
            />
          </div>
          <div className="register-form-input">
            <label>Email: </label>
            <Input
              type="email"
              name="email"
              onChange={handleChange}
              value={input.email}
            />
          </div>
          <div className="register-form-input">
            <label>Password: </label>
            <Input
              type="password"
              name="password"
              onChange={handleChange}
              value={input.password}
            />
          </div>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </form>
      </div>
    </>
  )
}

export default Register;