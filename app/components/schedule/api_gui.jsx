import React from 'react';
import {Link} from 'react-router';

import API from '../../api/API.js';
import getProperDate from '../../utils/properDate.js';
import properTime from '../../utils/time.js';

const database = firebase.database();
const rootRef = database.ref('lectures');
let FIREBASEDATA = [];

export default class API_GUI extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errorList: [''],
            lectures: [],
        };
        this.showSubmissionResult = this.showSubmissionResult.bind(this);
    }

    showSubmissionResult() {
        const errArr = API.setLecture();
        this.setState({
            errorList: errArr,
        });
    }

    componentWillMount() {
        rootRef.on('value', (snap) => {
            FIREBASEDATA = [];
            const Obj = snap.val();
            for (const x in Obj) {
                if (Object.prototype.hasOwnProperty.call(Obj, x)) {
                    FIREBASEDATA.push(Obj[x]);
                }
            }

            this.setState({
                lectures: FIREBASEDATA,
            });
        });
    }

    render() {
        return (
          <div>
            <Link to="/">Back</Link>
            <section className="api">
              <h1 className="api__header">API Graphic User Interface</h1><br/>
              Введите дату лекции<br/> <input id="date" type="text" defaultValue="2016-10-25" placeholder="Введите дату"/><br/>
              <input id="lecture" type="text" defaultValue="Лекция 3. Особенности проектирования мобильных интерфейсов" placeholder="Введите лекцию"/><br/>
              <input id="teacher" type="text" defaultValue="Васюнин Николай" placeholder="Введите   преподавателя"/><br/>
              <input id="company" type="text" defaultValue="Яндекс" placeholder="Введите компанию"/><br/>
              <input id="school" type="text" defaultValue="Школа Мобильного Дизайна" placeholder="Введите   школу"/><br/>
              Начало лекции <input id="startTime" defaultValue="12:00" type="text"/><br/>
              Конец лекции <input id="endTime" defaultValue="13:30" type="text"/><br/>
              <input id="classRoom" type="text" defaultValue="Зеленый кит" placeholder="Аудитория"/><br/>
              <input id="amountOfStudents" type="defaultValue" defaultValue="20" placeholder="Кол-во   студентов"/><br/>
              <input id="location" type="text" defaultValue="Москва" placeholder="Город"/><br/>
              <button id="submit" onClick={this.showSubmissionResult}>Submit</button>
              {
                this.state.errorList.map((error, index) => {
                    return (
                      <Show
                        key={index}
                        error={error}
                        />);
                })
              }
            </section>
            <section className="api__lectures">
              <div className="api__lectures__header">
                <div className="api__lectures__header__date">Дата</div>
                <div className="api__lectures__header__lecture">Лекция</div>
                <div className="api__lectures__header__teacher">Преподаватель</div>
                <div className="api__lectures__header__company">Компания</div>
                <div className="api__lectures__header__school">Школа</div>
                <div className="api__lectures__header__startTime">Начало</div>
                <div className="api__lectures__header__endTime">Конец</div>
                <div className="api__lectures__header__classRoom">Аудитория</div>
                <div className="api__lectures__header__classRoomCapacity">Вместимость аудитории</div>
                <div className="api__lectures__header__location">Местоположени</div>
                <div className="api__lectures__header__isDeleted">Удалена</div>
                <div className="api__lectures__header__btnChange">Изменить</div>
                <div className="api__lectures__header__btnDelete">Удалить</div>
              </div>
              {
                this.state.lectures.map((el, index) => {
                    return (
                      <DisplayLectures
                        key={index}
                        fullDate={getProperDate(el.date)}
                        lecture={el.lecture}
                        teacher={el.teacher.name}
                        company={el.company}
                        school={el.school.name}
                        startTime={el.date}
                        endTime={el.endTime}
                        classRoom={el.classRoom.name}
                        classRoomCapacity={Number(el.classRoom.maxStudents)}
                        location={el.location}
                        isDeleted={el.isDeleted}
                        />
                    );
                })
              }
            </section>
          </div>

        );
    }
}

function DisplayLectures(props) {
    const {fullDate, lecture, teacher, company, school, startTime, endTime, classRoom, classRoomCapacity, location, isDeleted} = props;

    return (
      <div className="api__lectures__line">
        <input className="api__lectures__line__date" defaultValue={fullDate}/>
        <input className="api__lectures__line__lecture" defaultValue={lecture}/>
        <input className="api__lectures__line__teacher" defaultValue={teacher}/>
        <input className="api__lectures__line__company" defaultValue={company}/>
        <input className="api__lectures__line__school" defaultValue={school}/>
        <input className="api__lectures__line__startTime" defaultValue={properTime(startTime)}/>
        <input className="api__lectures__line__endTime" defaultValue={properTime(endTime)}/>
        <input className="api__lectures__line__classRoom" defaultValue={classRoom}/>
        <input className="api__lectures__line__classRoomCapacity" defaultValue={classRoomCapacity}/>
        <input className="api__lectures__line__location" defaultValue={location}/>
        <select className="api__lectures__line__isDeleted" id="isDeleted">
          <option>{isDeleted.toString()}</option>
          <option>{(!isDeleted).toString()}</option>
        </select>
        <button className="api__lectures__line__btnChange" id="changeBtn">Изменить</button>
        <button className="api__lectures__line__btnDelete" id="deleteBtn">Удалить</button>
      </div>
    );
}

DisplayLectures.propTypes = {
    fullDate: React.PropTypes.string.isRequired,
    lecture: React.PropTypes.string.isRequired,
    teacher: React.PropTypes.string.isRequired,
    company: React.PropTypes.string.isRequired,
    school: React.PropTypes.string.isRequired,
    startTime: React.PropTypes.number.isRequired,
    endTime: React.PropTypes.number.isRequired,
    classRoom: React.PropTypes.string.isRequired,
    classRoomCapacity: React.PropTypes.number.isRequired,
    location: React.PropTypes.string.isRequired,
    isDeleted: React.PropTypes.bool.isRequired,

};

function Show(props) {
    const {error} = props;

    return (
      <div>
        <span className="error" style={{color: 'red'}}>{error}</span><br/>
      </div>
    );
}

Show.propTypes = {
    error: React.PropTypes.string.isRequired,
};
