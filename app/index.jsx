import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory, browserHistory } from 'react-router';

import API from './api/API.js';
import API_GUI from '../app/components/schedule/api_gui.jsx';
import ScheduleApp from './components/schedule/index.jsx';

const database = firebase.database();
const rootRef = database.ref('lectures');

rootRef.on('value', (snap) => {
    const Obj = snap.val();
    API.initialize(Obj);
});

const app = document.getElementById('root');

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={ScheduleApp}/>
    <Route path="/api" component={API_GUI}/>
  </Router>,
app);
