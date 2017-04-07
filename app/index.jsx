import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory, browserHistory } from 'react-router';

import API_GUI from '../app/components/schedule/api_gui.jsx';
import API from './api/API.js';
import ScheduleApp from './components/schedule/index.jsx';

// API.initialize();

const app = document.getElementById('root');

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={ScheduleApp}/>
    <Route path="/api" component={API_GUI}/>
  </Router>,
app);
