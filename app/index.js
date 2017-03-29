import React from 'react'
import ReactDOM from 'react-dom'
import DATA from '../js/data'; //все данные о лекциях

class API {
	initialize() {
		this.dates = DATA
	}

	getLectures() {
		this.lecturers = DATA.map(function(el) {
			return el.lecturer
		});
	};

	getLecturers() {
		this.rooms = DATA.map(function(el) {
			return el.room
		});
	};

	setLecture(item) {
		if (true) {

		}
		
		const {
			date,
			lecturer,
		} = item

		return true
	};
};

const ScheduleApp = React.createClass({ //класс, который рендерится столько раз, сколько объектов в массиве DATA
	render: function() {
		const {date, lecture, lecturer, location, school, city, company, room, startTime, endTime} = this.props; // присваиваем переменной обращение к свойствам объектов, чтобы не писать каждый раз this.props
		// далее отрисуем див с css классом friend
		return <div className="schedule-container__line">
							<div className="schedule-container__line__block_1">
									<div className="schedule-container__line__block_1__date">
											<span className="schedule-container__line__block_1__date__number">
												{date}
											</span>
									</div>
							</div>
							<div className="schedule-container__line__block_2">
									<div className="schedule-container__line__block_2__lecture">
										{lecture}
									</div>
									<div className="schedule-container__line__block_2__lecturer">
										<a href="#">
											{lecturer}
										</a>
									</div>
									<div className="schedule-container__line__block_2__company">
										{company}
									</div>
							</div>
							<div className="schedule-container__line__block_3">
									<div className="schedule-container__line__block_3__school">
										{school}
									</div>
							</div>
							<div className="schedule-container__line__block_4">
									<div className="schedule-container__line__block_4__time">
											<i className="fa fa-clock-o" aria-hidden="true"></i>
											{startTime} - {endTime}
									</div>
									<div className="schedule-container__line__block_4__room">
										Синий кит
									</div>
									<div className="schedule-container__line__block_4__location">
											<i className="fa fa-map-marker" aria-hidden="true"></i>
											{city}
									</div>
							</div>
					</div>
	}
})

const ScheduleList = React.createClass({ //
	getInitialState: function() {
		return {
			displayedItem: DATA //изначальное состояние компонента
		}
	},

	addContact: function() {
		let date = document.querySelector('#date').value;
		let lecture = document.querySelector('#lecture').value;
		let lecturer = document.querySelector('#lecturer').value;
		let location = document.querySelector('#location').value;
		let school = document.querySelector('#date').value;
		let arr = DATA.map(function(el) {
			return el.id;
		});

		let id = Math.max.apply(null, arr) + 1;

		DATA.push({
			id: id,
			date: date,
			lecture: lecture,
			lecturer: lecturer,
			location: location,
			school: school,
		});

		this.setState({ // специальный метод React`a, который говорит что нужно перерендерить состояние компонента
			displayedItem: DATA
		});
	},

	handleSearch: function(event) {
		event.persist();
		let searchQuery = event.target.value.toLowerCase();
		let displayedItem = DATA.filter(function(el) {
			let searchValue = el.lecture.toLowerCase();

			return searchValue.indexOf(searchQuery) !== -1;
		});

		this.setState({ // специальный метод React`a, который говорит что нужно перерендерить состояние компонента
			displayedItem: displayedItem
		});
	},

	render: function() {
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
					<div className="schedule-container">
						{
							this.state.displayedItem.map(function(el) { // возвращаем объекты, которые находятся в состояни компоненты displayedItem
								return < ScheduleApp
												key={el.id}
												date={el.date}
												lecture={el.lecture}
												lecturer={el.lecturer}
												location={el.location}
												school={el.school}
												city={el.city}
												company={el.company}
												room={el.room}
												startTime={el.startTime}
												endTime={el.endTime}/>
							})
						}
					</div>
			</div>
		)
	}
});

ReactDOM.render( //отрисовываем класс FriendsList
	<div>
		<ScheduleList/>
	</div>,
	document.getElementById('root') //root - это куда мы отрисовываем класс
);
