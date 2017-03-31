import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';

import API from './api';

import LECTURES from '../js/lectures'; //все данные о лекциях
import ScheduleApp from './components/schedule/index.jsx';

let DATA = [];

for (let x in LECTURES) {
	DATA.push(LECTURES[x]);
}

API.initialize();

ReactDOM.render( //отрисовываем класс ScheduleApp
	<ScheduleApp/>,
	document.getElementById('root') //root - это куда мы отрисовываем класс
);
