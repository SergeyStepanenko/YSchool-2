import React from 'react';
import {Link} from 'react-router';

import API from '../../api';
import ScheduleApp from '../schedule/index.jsx';

export default class API_GUI extends React.Component {
    render() {
        return (
          <div>
            <Link to="/">Back</Link>
            <section className="api">
              <h1 className="api__header">API Graphic User Interface</h1><br/>
              Введите дату лекции<br/> <input id="date" type="date" placeholder="Введите дату"/><br/>
              <input id="lecture" type="text" placeholder="Введите лекцию"/><br/>
              <input id="teacher" type="text" placeholder="Введите преподавателя"/><br/>
              <input id="company" type="text" placeholder="Введите компанию"/><br/>
              <input id="school" type="text" placeholder="Введите школу"/><br/>
              Начало лекции <input id="startTime" type="time"/><br/>
              Конец лекции <input id="endTime" type="time"/><br/>
              <input id="classRoom" type="text" placeholder="Аудитория"/><br/>
              <input id="amountOfStudents" type="value" placeholder="Кол-во студентов"/><br/>
              <input id="location" type="text" placeholder="Город"/><br/>
              <button onClick={API.setLecture}>Submit</button>
            </section>
          </div>
        );
    }
}
