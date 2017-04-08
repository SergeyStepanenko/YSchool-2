import React from 'react';
import {Link} from 'react-router';

import API from '../../api/API.js';
import convert from '../../utils/convert.js'; // конвертирую падеж названия месяца (прим. январь -> января)
import Filter from '../schedule/filter.jsx';
import properTime from '../../utils/time.js'; // исправляю нюанс вывода времени (прим. 12:0 -> 12:00 (с учетом проверки))
import Schedule from './schedule.jsx';

const database = firebase.database();
const rootRef = database.ref('lectures');

rootRef.on('value', (snap) => {
    const FIREBASEDATA = [];
    const Obj = snap.val();
    for (const x in Obj) {
        if (Object.prototype.hasOwnProperty.call(Obj, x)) {
            FIREBASEDATA.push(Obj[x]);
        }
    }

    API.initialize(FIREBASEDATA);
});

let FIREBASEDATA = [];
const LECTURES = API.getLectures();
const TEACHERS = API.getTeachers();

export default class ScheduleApp extends React.Component {
    constructor() {
        super();

        this.state = {
            displayedItem: [],
        };
        this.filter = this.filter.bind(this);
    }

    componentDidMount() {
        rootRef.on('value', (snap) => {
            FIREBASEDATA = [];
            const Obj = snap.val();
            for (const x in Obj) {
                if (Object.prototype.hasOwnProperty.call(Obj, x)) {
                    FIREBASEDATA.push(Obj[x]);
                }
            }

            this.setState({
                displayedItem: FIREBASEDATA,
            });
        });
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
            <div className="schedule-container">
              <div className="schedule-container__line schedule-container__line schedule-container__line schedule-container__line-header">
                <div className="schedule-container__line__block_1 schedule-container__line__block_1-header">
                  <input id="dateFrom" className="input" type="date" onChange={this.filter}/>
                  <input id="dateTo" className="input" type="date" onChange={this.filter}/>
                </div>
                <div className="schedule-container__line__block_2 schedule-container__line__block_2-header">
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
                </div>
                <div className="schedule-container__line__block_3 schedule-container__line__block_3-header">
                  <select id="school" className="input" onChange={this.filter}>
                    <option>Все</option>
                    <option>Школа Мобильного Дизайна</option>
                    <option>Школа Мобильной Разработки</option>
                    <option>Школа Разработки Интерфейсов</option>
                  </select>
                </div>
                <div className="schedule-container__line__block_4 schedule-container__line__block_4-header">
                  <select id="classRoom" className="input" onChange={this.filter}>
                    <option>Все</option>
                    <option>Зеленый кит</option>
                    <option>Красный кит</option>
                  </select>
                </div>
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
