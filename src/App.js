import React from "react";

import './App.css';
import 'antd/dist/antd.css';

import Main from "./layouts/Main";
import { UserProvider } from "./contexts/UserContext";

function App() {
  return (
    <UserProvider>
      <Main />
    </UserProvider>
  );
}

export default App;
