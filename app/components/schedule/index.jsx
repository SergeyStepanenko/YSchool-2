import React from 'react';
import {Link} from 'react-router';

import API from '../../api/API.js';
import convert from '../../utils/convert.js'; // конвертирую падеж названия месяца (прим. январь -> января)
import Filter from '../schedule/filter.jsx';
import properTime from '../../utils/time.js'; // исправляю нюанс вывода времени (прим. 12:0 -> 12:00 (с учетом проверки))
import Schedule from './schedule.jsx';

const database = firebase.database();
const rootRef = database.ref('lectures');

let FIREBASEDATA = [];
// const LECTURES = API.getLectures();
// const TEACHERS = API.getTeachers();

export default class ScheduleApp extends React.Component {
    constructor() {
        super();

        this.state = {
            displayedItem: [],
        };
        this.filter = this.filter.bind(this);
        this.getLectures = this.getLectures.bind(this);
    }

    componentDidMount() {
        rootRef.on('value', (snap) => {
            const Obj = snap.val();
            for (const x in Obj) {
                if (Object.prototype.hasOwnProperty.call(Obj, x)) {
                    FIREBASEDATA.push(Obj[x]);
                }
            }

            API.initialize(Obj);

            this.setState({
                displayedItem: FIREBASEDATA,
            });
        });
    }

    getLectures() {
        const LECTURES = API.getLectures();
    }

    filter() {
        const dateFrom = document.querySelector('#dateFrom').value.replace('-', ', ');
        const dateTo = document.querySelector('#dateTo').value.replace('-', ', ');
        const dF = new Date(dateFrom).getTime();
        const dT = new Date(dateTo).getTime();
        const t = document.querySelector('#teacher').value;
        const sC = document.querySelector('#school').value;
        const cR = document.querySelector('#classRoom').value;
        const displayedItem = API.filter(FIREBASEDATA, dF, dT, t, sC, cR);

        this.setState({
            displayedItem: displayedItem,
        });
    }

    render() {
        return (
          <div>
            <Link to="api">API</Link>
            <button onClick={this.getLectures}/>
            <div className="schedule-container">
              <div className="schedule-container__filters">
                <input id="dateFrom" className="input" type="date" onChange={this.filter}/>
                <input id="dateTo" className="input" type="date" onChange={this.filter}/>
                <select id="teacher" className="input" onChange={this.filter}>
                  <option>Все</option>
                  {
                    FIREBASEDATA.map((el, index) => {
                        return (
                          <Filter
                            key={index}
                            value={el.teacher.name}
                            />);
                    })
                  }
                </select>
                {/* <label className="label">Выберите школу</label> */}
                <select id="school" className="input" onChange={this.filter}>
                  <option className="option">Все</option>
                  <option className="option">Школа Мобильного Дизайна</option>
                  <option className="option">Школа Мобильной Разработки</option>
                  <option className="option">Школа Разработки Интерфейсов</option>
                </select>
                <select id="classRoom" className="input" onChange={this.filter}>
                  <option>Все</option>
                  <option>Зеленый кит</option>
                  <option>Красный кит</option>
                </select>
              </div>

              {
    this.state.displayedItem.map((el, index) => {
        return (
          <Schedule
            key={index}
            date={new Date(Number(el.date)).getDate()}
            month={convert(Number(el.date))}
            lecture={el.lecture}
            teacher={el.teacher.name}
            location={el.location}
            school={el.school.name}
            city={el.city}
            company={el.company}
            room={el.classRoom}
            startTime={properTime(el.date)}
            classRoom={el.classRoom.name}
            endTime={properTime(el.endTime)}
            />);
    })
            }
            </div>
          </div>
        );
    }
}
