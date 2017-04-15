import React from 'react';
import {Link} from 'react-router';

import API from '../../api/API.js';
import getProperDate from '../../utils/properDate.js';

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
              Введите дату лекции<br/> <input id="date" type="date" defaultValue="2016-10-18" placeholder="Введите дату"/><br/>
              <input id="lecture" type="text" defaultValue="Тест лекция" placeholder="Введите лекцию"/><br/>
              <input id="teacher" type="text" defaultValue="Антон Тен" placeholder="Введите   преподавателя"/><br/>
              <input id="company" type="text" defaultValue="Яндекс" placeholder="Введите компанию"/><br/>
              <input id="school" type="text" defaultValue="Школа Мобильного Дизайна" placeholder="Введите   школу"/><br/>
              Начало лекции <input id="startTime" defaultValue="12:00" type="time"/><br/>
              Конец лекции <input id="endTime" defaultValue="13:30" type="time"/><br/>
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
                        classRoomCapacity={el.classRoom.maxStudents}
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
        <input defaultValue={fullDate}/>
        <input id="lecture" defaultValue={lecture}/>
        <input defaultValue={teacher}/>
        <input defaultValue={company}/>
        <input defaultValue={school}/>
        <input defaultValue={startTime}/>
        <input defaultValue={endTime}/>
        <input defaultValue={classRoom}/>
        <input defaultValue={classRoomCapacity}/>
        <input defaultValue={location}/>
        <input defaultValue={isDeleted}/>
        <button id="changeBtn">Change</button>
        <button id="deleteBtn">Delete</button>
      </div>
    );
}

DisplayLectures.propTypes = {
    fullDate: React.PropTypes.string.isRequired,
    lecture: React.PropTypes.string.isRequired,
    teacher: React.PropTypes.string.isRequired,
    company: React.PropTypes.string.isRequired,
    school: React.PropTypes.string.isRequired,
    startTime: React.PropTypes.string.isRequired,
    endTime: React.PropTypes.string.isRequired,
    classRoom: React.PropTypes.string.isRequired,
    classRoomCapacity: React.PropTypes.string.isRequired,
    location: React.PropTypes.string.isRequired,
    isDeleted: React.PropTypes.string.isRequired,

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
