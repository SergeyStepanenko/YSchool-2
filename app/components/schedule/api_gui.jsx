import React from 'react';
import {Link} from 'react-router';

import API from '../../api/API.js';

export default class API_GUI extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errorList: [''],
        };
        this.showSubmissionResult = this.showSubmissionResult.bind(this);
    }

    showSubmissionResult() {
        const errArr = API.setLecture();
        this.setState({
            errorList: errArr,
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
              <input id="teacher" type="text" defaultValue="Test" placeholder="Введите   преподавателя"/><br/>
              <input id="company" type="text" defaultValue="Яндекс" placeholder="Введите компанию"/><br/>
              <input id="school" type="text" defaultValue="Test" placeholder="Введите   школу"/><br/>
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
          </div>

        );
    }
}

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
