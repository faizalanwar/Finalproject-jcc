import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import {
  Button,
  Input,
  Typography
} from "antd";
import {
  LeftOutlined
} from '@ant-design/icons';

import { UserContext } from '../contexts/UserContext';

const { Title } = Typography;

const Password = () => {
  const history = useHistory();
  const [user,] = useContext(UserContext);
  let token = user ? user.token : null;
  const [input, setInput] = useState({
    current_password: "",
    new_password: "",
    new_confirm_password: ""
  })

  const handleChange = (event) => {
    let value = event.target.value;
    let name = event.target.name;
    setInput({
      ...input,
      [name]: value
    })
  }

  const handleSubmit = (event) => {
    console.log("INPUT: " + JSON.stringify(input))
    event.preventDefault();
    axios
      .post(
        'https://backendexample.sanbersy.com/api/change-password',
        input,
        {
          headers: {
            "Authorization": "Bearer" + token
          }
        }
      )
      .then(
        () => {
          history.push('/')
        }
      )
      .catch(
        error => {
          console.log(error.message);
        }
      )
    setInput({
      current_password: "",
      new_password: "",
      new_confirm_password: ""
    })
  }

  const handleButton = (event) => {
    history.push('/')
  }

  return (
    <div className="pwd-form-container">
      <Button
        className="pwd-form-return"
        size="large"
        onClick={handleButton}
      >
        <LeftOutlined />
      </Button>
      <Title className="pwd-form-title">Change Password</Title>
      <form
        className="pwd-form"
        onSubmit={handleSubmit}
      >
        <div className="pwd-form-input">
          <label>Old Password: </label>
          <Input
            type="password"
            name="current_password"
            onChange={handleChange}
            value={input.current_password}
          />
        </div>
        <div className="pwd-form-input">
          <label>New Password: </label>
          <Input
            type="password"
            name="new_password"
            onChange={handleChange}
            value={input.new_password}
          />
        </div>
        <div className="pwd-form-input">
          <label>Confirm New Password: </label>
          <Input
            type="password"
            name="new_confirm_password"
            onChange={handleChange}
            value={input.new_confirm_password}
          />
        </div>
        <Button type="primary" htmlType="submit">
          Submit
          </Button>
      </form>
    </div>
  )
}

export default Password;