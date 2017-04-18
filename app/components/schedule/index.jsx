import React from 'react';
import {Link} from 'react-router';

import API from '../../api/API.js';
import convert from '../../utils/convert.js'; // конвертирую падеж названия месяца (прим. январь -> января)
import Filter from '../schedule/filter.jsx';
import properTime from '../../utils/time.js'; // исправляю нюанс вывода времени (прим. 12:0 -> 12:00 (с учетом проверки))
import Schedule from './schedule.jsx';
import getProperDate from '../../utils/properDate.js';

const database = firebase.database();
const rootRef = database.ref('lectures');

let FIREBASEDATA = [];
let classRooms = [];
let teachers = [];
let schools = [];
let dates = [];

export default class ScheduleApp extends React.Component {
    constructor() {
        super();

        this.state = {
            displayedItem: [],
        };
        this.filter = this.filter.bind(this);
    }

    componentWillMount() {
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

            for (let i = 0; i < FIREBASEDATA.length; i++) {
                const path = FIREBASEDATA[i].date;
                dates.push(getProperDate(path));
            }

            dates = dates.sort((a, b) => { // сортируем лекции дате
                if (a < b) return -1;
                if (a > b) return 1;

                return 0;
            });

            dates = [...new Set(dates)];

            this.setState({
                displayedItem: FIREBASEDATA,
            });
        });
    }

    filter() {
        const isIE = /*@cc_on!@*/false || !!document.documentMode;
        const isEdge = !isIE && !!window.StyleMedia;
        let dateTo;
        let dateFrom;

        if (isIE || isEdge) { // исправляем баг с датой в IE & EDGE
            dateFrom = document.querySelector('#dateFrom').value.replace(/-/, ', ');
            dateTo = document.querySelector('#dateTo').value.replace(/-/, ', ');
        } else {
            dateFrom = document.querySelector('#dateFrom').value.replace(/-/g, ', ');
            dateTo = document.querySelector('#dateTo').value.replace(/-/g, ', ');
        }

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
                <select id="dateFrom" className="input" onChange={this.filter}>
                  <option>С</option>
                  {
                      dates.map((key, index) => {
                          return (
                            <Filter
                              key={index}
                              value={key}
                              />);
                      })
                  }
                </select>
                <select id="dateTo" className="input" onChange={this.filter}>
                  <option>По</option>
                  {
                      dates.map((key, index) => {
                          return (
                            <Filter
                              key={index}
                              value={key}
                              />);
                      })
                  }
                </select>

                <select id="teacher" className="input" onChange={this.filter}>
                  <option>Все преподаватели</option>
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
                  <option className="option">Все школы</option>
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
                  <option>Все аудитории</option>
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
                month={new Date(el.date).toLocaleString('ru', { month: 'long' })}
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
