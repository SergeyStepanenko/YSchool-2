import React from 'react';

export default function Schedule(props) {
    const {date, lecture, teacher, location, school, company, startTime, endTime, month, classRoom} = props;

    return ( // далее отрисуем див
      <div className="schedule-container__line">
        <div className="schedule-container__line__block_1">
          <div className="schedule-container__line__block_1__date">
            <span className="schedule-container__line__block_1__date__number">
              {date}
            </span>
            <span className="schedule-container__line__block_1__month">
              {month}
            </span>
          </div>
        </div>
        <div className="schedule-container__line__block_2">
          <div className="schedule-container__line__block_2__lecture">
            {lecture}
          </div>
          <div className="schedule-container__line__block_2__lecturer">
            <a href="#">
              {teacher}
            </a>
          </div>
          <div className="schedule-container__line__block_2__company">
            {company}
          </div>
        </div>
        <div className="schedule-container__line__block_3">
          <div className="schedule-container__line__block_3__school">
            {school}
          </div>
        </div>
        <div className="schedule-container__line__block_4">
          <div className="schedule-container__line__block_4__time">
            <i className="fa fa-clock-o" aria-hidden="true"/>
            {startTime} - {endTime}
          </div>
          <div className="schedule-container__line__block_4__room">
            <i className="fa fa-home" aria-hidden="true"/>
            {classRoom}
          </div>
          <div className="schedule-container__line__block_4__location">
            <i className="fa fa-map-marker" aria-hidden="true"/>
            {location}
          </div>
        </div>
      </div>);
}

Schedule.propTypes = {
    date: React.PropTypes.number.isRequired,
    month: React.PropTypes.string.isRequired,
    lecture: React.PropTypes.string.isRequired,
    teacher: React.PropTypes.string.isRequired,
    location: React.PropTypes.string.isRequired,
    school: React.PropTypes.string.isRequired,
    company: React.PropTypes.string.isRequired,
    startTime: React.PropTypes.string.isRequired,
    classRoom: React.PropTypes.string.isRequired,
    endTime: React.PropTypes.string.isRequired,
};
