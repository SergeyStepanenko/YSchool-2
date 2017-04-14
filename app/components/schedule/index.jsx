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
// let TEACHERS = [];
// let SCHOOLS = [];
let classRooms = [];
let teachers = [];
let schools = [];

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
                    if (Obj[x].isDeleted === false) { // если флаг isDeleter === true, мы не показываем эту лекцию в списке
                        FIREBASEDATA.push(Obj[x]);
                    }
                }
            }
            FIREBASEDATA = FIREBASEDATA.sort((a, b) => { // сортируем лекции дате
                if (a.date < b.date) return -1;
                if (a.date > b.date) return 1;

                return 0;
            });

            classRooms = API.classRooms;
            teachers = API.teachers;
            schools = API.schools;

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
              <div className="schedule-container__filters">
                <input id="dateFrom" className="input" type="date" onChange={this.filter}/>
                <input id="dateTo" className="input" type="date" onChange={this.filter}/>
                <select id="teacher" className="input" onChange={this.filter}>
                  <option>Все</option>
                  {
                      Object.keys(teachers).map((key, index) => {
                          return (
                            <Filter
                              key={index}
                              value={teachers[key].name}
                              />);
                      })
                  }
                </select>
                <select id="school" className="input" onChange={this.filter}>
                  <option className="option">Все</option>
                  {
                      Object.keys(schools).map((key, index) => {
                          return (
                            <Filter
                              key={index}
                              value={schools[key].name}
                              />);
                      })
                  }
                </select>
                <select id="classRoom" className="input" onChange={this.filter}>
                  <option>Все</option>
                  {
                      Object.keys(classRooms).map((key, index) => {
                          return (
                            <Filter
                              key={index}
                              value={classRooms[key].name}
                              />);
                      })
                  }
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
