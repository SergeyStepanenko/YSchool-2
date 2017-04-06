import React from 'react';
import {Link} from 'react-router';

import API from '../../api';
import convert from '../../utils/convert.js'; // конвертирую падеж названия месяца (прим. январь -> января)
import moment from 'moment';
import properTime from '../../utils/time.js'; // исправляю нюанс вывода времени (прим. 12:0 -> 12:00 (с учетом проверки))
import Schedule from './schedule.jsx';
import Test from './test.jsx';
import API_GUI from '../schedule/api_gui.jsx';

API.initialize();

const database = firebase.database();
const DATA = [];
let FBDATA = [];
const LECTURES = API.getLectures();
const TEACHERS = API.getTeachers();

for (const x in LECTURES) {
    if (Object.prototype.hasOwnProperty.call(LECTURES, x)) {
        DATA.push(LECTURES[x]);
    }
}

export default class ScheduleApp extends React.Component {
    constructor() {
        super();

        this.state = {
            // displayedItem: [],
            test: 1
        };

        this.filter = this.filter.bind(this);
        this.setLecture = this.setLecture.bind(this);
    }

    componentDidMount() {
        const rootRef = database.ref('test');
        rootRef.on('value', snap => {
            let Obj = snap.val();
            let keys = Object.keys(Obj);
            let arr = [];

            for (let x in Obj) {
                if (Obj.hasOwnProperty(x)) {
                    arr.push(Obj[x])
                }
            }

            let displayedItem = arr;

            this.setState({
                // displayedItem: FBDATA
                // test: 2
                displayedItem: displayedItem
            });
        });
    }
        // const rootRef = database.ref('lectures');
        // rootRef.on('value', gotData);
        //
        // function gotData(data) {
        //     const Y = data.val();
        //     let keys = Object.keys(Y);
        //
        //     for (var x in Y) {
        //         if (Y.hasOwnProperty(x)) {
        //             FBDATA.push(Y[x]);
        //         }
        //     }
        //
        //     return FBDATA;
        // }
        // this.setState({
        //     displayedItem: gotData()
        // });


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
              {/* {
                  this.state.test.map((el) => {
                      return (
                        <Test
                          key={el.id}
                          val={el.val}
                          val2={el.val2}
                        />
                      )
                  })
              } */}


              {/* {
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
            } */}
            </div>
          </div>
        );
    }
}
