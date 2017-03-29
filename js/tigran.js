import data from './data.js';

//
{
  lecture: {
    '1': {
      id: '1',
      name: 'Лекция',
      teacher: ['12', '23'],
      isDeleted: false,
    },
    '2': {
      id: '2',
      name: 'Лекция 2',
      teacher: '12',
      isDeleted: false,
    },
  }
  teacher: {

  }
}

class YourAPI {
  initialize() {
    this.lectures = data.lectures;
    this.teachers = data.teachers;
  }

  getLectures() {
    return this.lectures;
  }

  getTeacers() {
    return this.trachers;
  }

  setLecteru(item) {
    // праоверки
    const {
      date,
      teacher,
    } = item;

    const data = {
      ...this.data,
    };

    this.lectures = {
      ...lectures,
      [item.id]: {
        ...lectures[item.id],
        ...item,
      },
    };

    return true;
  }

  deleteLect
}

export default YourAPI;

import YourAPI from 'YourAPI';

<LecturesComponent lectures={} teacher={}/>

class LecturesComponent extends React.Component {
  componentDidMount() {
    this.state.lectures = YourAPI.getLectures();
  }

  this.prop;
  this.state;

  handleItmeChange(item) {
    const result = YourAPI.setLecteru();

    if (!result) {
      return;
    }

    const lectures = this.state.lectures;

    this.state.lectures = {
      ...lectures,
      [item.id]: {
        ...lectures[item.id],
        ...item,
      },
    };

    deleteItem(item) {
      const result = YourAPI.deleteLecteru();

      if (!result) {
        return;
      }

      const lectures = this.state.lectures;

      this.state.lectures = {
        ...lectures,
        [item.id]: {
          ...lectures[item.id],
          ...item,
        },
      };
    }
  }

  render() {
    this.state.lectures.map((lecture) => {
      return (
        <OneLecture lecture={lecture} />
      )
    })
  }
}
