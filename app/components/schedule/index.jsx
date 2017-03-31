import React from 'react';

import Schedule from './schedule.jsx';
import API from '../../api'; //все данные о лекциях
import convert from '../../utils/convert.js';

API.initialize();

const DATA = [];
const LECTURES = API.getLectures();


for (let x in LECTURES) {
	DATA.push(LECTURES[x]);
}



class ScheduleApp extends React.Component {
	constructor() {
		super();

		this.state = {
			displayedItem: DATA,
		};
	}

	// addContact: function() {
	// 	let date = document.querySelector('#date').value;
	// 	let lecture = document.querySelector('#lecture').value;
	// 	let lecturer = document.querySelector('#lecturer').value;
	// 	let location = document.querySelector('#location').value;
	// 	let school = document.querySelector('#date').value;
	// 	let arr = DATA.map(function(el) {
	// 		return el.id;
	// 	});
	//
	// 	let id = Math.max.apply(null, arr) + 1;
	//
	// 	DATA.push({
	// 		id: id,
	// 		date: date,
	// 		lecture: lecture,
	// 		lecturer: lecturer,
	// 		location: location,
	// 		school: school,
	// 	});
	//
	// 	this.setState({ // специальный метод React`a, который говорит что нужно перерендерить состояние компонента
	// 		displayedItem: DATA
	// 	});
	// },


	handleSearch(event) {
		event.persist();
		let searchQuery = event.target.value.toLowerCase();
		let displayedItem = DATA.filter(function(el) {
			let searchValue = el.lecture.toLowerCase();

			return searchValue.indexOf(searchQuery) !== -1;
		});

		this.setState({ // специальный метод React`a, который говорит что нужно перерендерить состояние компонента
			displayedItem: displayedItem
		});
	}

	render() {
		return (
			<div>
				<input id='date' type='text' name='date' placeholder='date'/>
				<input id='lecture' type='text' name='lecture' placeholder='lecture'/>
				<input id='lecturer' type='text' name='lecturer' placeholder='lecturer'/>
				<input id='location' type='text' name='location' placeholder='location'/>
				<input id='school' type='text' name='school' placeholder='school'/>
				<button name='add' onClick={this.addContact} style={{height: 30 + 'px', width: 50 + 'px', marginTop: 10 + 'px'}}>Add</button><br/>
				<span>Search contact</span><br/>
				<input type='text' placeholder='lecture name' onChange={this.handleSearch}/><br/>
				<strong style={{fontSize: 20 + 'px'}}>Расписание лекций</strong>
				<div className='schedule-container'>
					{
						this.state.displayedItem.map(el => { // возвращаем объекты, которые находятся в состояни компоненты displayedItem
						   return < Schedule
									key={el.id}
									date={new Date(+el.date).getDate()}
									month={convert(+el.date)}
									lecture={el.lecture}
									lecturer={el.lecturer.name}
									location={el.location}
									school={el.school}
									city={el.city}
									company={el.company}
									room={el.classRoom}
									startTime={el.startTime}
									classRoom={el.classRoom.name}
									endTime={el.endTime}/>
						})
					}
				</div>
			</div>
		);
	}
}

export default ScheduleApp;
