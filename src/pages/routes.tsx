import React from 'react';
import {Switch, Route} from 'react-router-dom';
import MainPage from './MainPage';

export default () => {
  return (
    <Switch>
      <Route path="/" component={MainPage} exact />
    </Switch>
  );
};