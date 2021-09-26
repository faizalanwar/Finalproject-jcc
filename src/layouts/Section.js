import React from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Movies from '../pages/Movies';
import MovieView from '../pages/MovieView';
import MoviesForm from '../pages/MoviesForm';
import Games from '../pages/Games';
import GameView from '../pages/GameView';
import GamesForm from '../pages/GamesForm';
import Register from '../pages/Register';
import Password from '../pages/Password';
import About from '../pages/About';

const Section = () => {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/movies">
          <Movies />
        </Route>
        <Route exact path="/movies/view/:id">
          <MovieView />
        </Route>
        <Route exact path="/movies/create">
          <MoviesForm />
        </Route>
        <Route exact path="/movies/edit/:id">
          <MoviesForm />
        </Route>
        <Route exact path="/games">
          <Games />
        </Route>
        <Route exact path="/games/view/:id">
          <GameView />
        </Route>
        <Route exact path="/games/create">
          <GamesForm />
        </Route>
        <Route exact path="/games/edit/:id">
          <GamesForm />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/change-password">
          <Password />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
      </Switch>
    </>
  )
}

export default Section;