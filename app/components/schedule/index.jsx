import React from 'react';
import {Link} from 'react-router';
import createFragment from 'react-addons-create-fragment';

import API from '../../api';
import convert from '../../utils/convert.js'; // конвертирую падеж названия месяца (прим. январь -> января)
import moment from 'moment';
import properTime from '../../utils/time.js'; // исправляю нюанс вывода времени (прим. 12:0 -> 12:00 (с учетом проверки))
import Schedule from './schedule.jsx';
import Test from './test.jsx';
import API_GUI from '../schedule/api_gui.jsx';

API.initialize();

const database = firebase.database();
const rootRef = database.ref('lectures');

const DATA = [];
const LECTURES = API.getLectures();
const TEACHERS = API.getTeachers();
let arr = [];

for (const x in LECTURES) {
    if (Object.prototype.hasOwnProperty.call(LECTURES, x)) {
        DATA.push(LECTURES[x]);
    }
}
// let firebaseArray = [];
// database.ref('/lectures/').once('value').then((snapshot) => {
//     const firebaseObject = snapshot.val();
//
//     for (const x in firebaseObject) {
//         if (Object.prototype.hasOwnProperty.call(firebaseObject, x)) {
//             firebaseArray.push(firebaseObject[x]);
//         }
//     }
//
//     console.log(firebaseArray);
// });

export default class ScheduleApp extends React.Component {
    constructor() {
        super();

        this.state = {
            displayedItem: [],
        };

        this.filter = this.filter.bind(this);
        this.setLecture = this.setLecture.bind(this);
    }

    componentDidMount() {
        rootRef.on('value', snap => {
            let Obj = snap.val();
            for (const x in Obj) {
                if (Object.prototype.hasOwnProperty.call(Obj, x)) {
                    arr.push(Obj[x]);
                }
            }
            this.setState({
                displayedItem: arr
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
        const displayedItem = API.filter(dF, dT, t, sC, cR);

        this.setState({
            displayedItem: displayedItem
        });
    }

    setLecture() {
        let displayedItem = API.setLecture();

        this.setState({
            displayedItem: displayedItem
        });
    }

    render() {
        return (
          <div>
            {this.state.test}<br/>
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
                    <option>Антон Тен</option>
                    <option>Эдуард Мацуков</option>
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
    this.state.displayedItem.map((el) => {
        return (
          <Schedule
            key={el.id}
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
