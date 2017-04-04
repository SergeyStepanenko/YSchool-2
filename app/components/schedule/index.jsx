import React from 'react';

import Schedule from './schedule.jsx';
import API from '../../api';
import convert from '../../utils/convert.js'; //конвертирую падеж названия месяца (прим. январь -> января)
import properTime from '../../utils/time.js'; //исправляю нюанс вывода времени (прим. 12:0 -> 12:00 (с учетом проверки))
import moment from 'moment';

API.initialize();

const DATA = [];
const LECTURES = API.getLectures();
const TEACHERS = API.getTeachers();

for (let x in LECTURES) {
	DATA.push(LECTURES[x]); //создаю массив объектов для удобства работы в React
};

class ScheduleApp extends React.Component {
	constructor() {
		super();

		this.state = {
			displayedItem: DATA,
		};

		this.filter = this.filter.bind(this);
	};

	filter() {
		let dateFrom = document.querySelector('#dateFrom').value.replace('-', ', '),
			dateTo = document.querySelector('#dateTo').value.replace('-', ', '),
			dF = new Date(dateFrom).getTime(),
			dT = new Date(dateTo).getTime(),
			t = document.querySelector('#teacher').value,
			sC = document.querySelector('#school').value,
			cR = document.querySelector('#classRoom').value;

		let displayedItem = API.filter(dF, dT, t, sC, cR);

		this.setState({
			displayedItem: displayedItem
		});
	};

	render() {
		return (
			<div>
				<div className='schedule-container'>
					<div className='schedule-container__line schedule-container__line schedule-container__line schedule-container__line-header'>
						<div className='schedule-container__line__block_1 schedule-container__line__block_1-header'>
							<input id='dateFrom' className='input' type='date' onChange={this.filter}></input>
							<input id='dateTo' className='input' type='date' onChange={this.filter}></input>
						</div>
						<div className='schedule-container__line__block_2 schedule-container__line__block_2-header'>
							<select id='teacher' className='input' onChange={this.filter}>
								<option>Все</option>
							    <option>Антон Тен</option>
							    <option>Эдуард Мацуков</option>
							</select>
						</div>
						<div className='schedule-container__line__block_3 schedule-container__line__block_3-header'>
							<select id='school' className='input' onChange={this.filter}>
								<option>Все</option>
							    <option>Школа Мобильного Дизайна</option>
							    <option>Школа Мобильной Разработки</option>
							    <option>Школа Разработки Интерфейсов</option>
							</select>
						</div>
						<div className='schedule-container__line__block_4 schedule-container__line__block_4-header'>
							<select id='classRoom' className='input' onChange={this.filter}>
								<option>Все</option>
							    <option>Зеленый кит</option>
							    <option>Красный кит</option>
							</select>
						</div>
					</div>
					{
						this.state.displayedItem.map(el => { // возвращаем объекты, которые находятся в состояни компоненты displayedItem
						   return < Schedule
									key={el.id}
									date={new Date(+el.date).getDate()}
									month={convert(+el.date)}
									lecture={el.lecture}
									teacher={el.teacher.name}
									location={el.location}
									school={el.school.name}
									city={el.city}
									company={el.company}
									room={el.classRoom}
									startTime={properTime(el.date)}
									classRoom={el.classRoom.name}
									endTime={properTime(el.endTime)}/>
						})
					}
				</div>
			</div>
		);
	}
}

export default ScheduleApp;

// const lecturesArray = Object.keys(LECTURES);
// let schoolArr = [];
//
// for (var i = 0; i < lecturesArray.length; i++) {
// 	schoolArr.push(LECTURES[lecturesArray[i]].school.id)
// }
//
// console.log(schoolArr);
