// import API_GUI from '../components/schedule/api_gui.jsx';
import {checkInputFields, checkIntersection, checkIfStartTimeIsEarlierThanEndTime, matchTeacher, matchSchool, matchClassRoom} from '../utils/addLectureValidation.js';

const database = firebase.database();
const rootRef = database.ref('lectures');

let LECTURES, TEACHERS, CLASSROOMS, SCHOOLS;

class API {
    initialize(Obj) {
        this.lectures = Obj;
        this.teachers = {};
        this.classRooms = {};
        this.schools = {};
        this.error = ['err'];
        const lecturesArray = Object.keys(Obj);
        lecturesArray.map((id) => {
            const teacherId = [Obj[id].teacher.id];

            this.teachers[teacherId] = {
                name: Obj[id].teacher.name,
                lectures: [
                    ...(this.teachers[teacherId] && this.teachers[teacherId].lectures || []),
                    id
                ],
            };

            const classRoomId = [Obj[id].classRoom.id];
            const classRoom = Obj[id].classRoom;

            this.classRooms[classRoomId] = {
                name: classRoom.name,
                maxStudents: classRoom.maxStudents,
                lectures: [
                    ...(this.classRooms[classRoomId] && this.classRooms[classRoomId].lectures || []),
                    id
                ],
            };

            const schoolId = [Obj[id].school.id];
            const school = [Obj[id].school];

            this.schools[schoolId] = {
                name: Obj[id].school.name,
                lectures: [
                    ...(this.schools[schoolId] && this.schools[schoolId].lectures || []),
                    id
                ],
            };
            LECTURES = this.lectures;
            TEACHERS = this.teachers;
            CLASSROOMS = this.classRooms;
            SCHOOLS = this.schools;

            return id;
        });
        console.info('API`s ready');
    }

    getLectures() {
        return this.lectures;
    }

    getTeachers() {
        return this.teachers;
    }

    filter(FIREBASEDATA, dF, dT, t, sC, cR) {
        let displayedItem = FIREBASEDATA;

        displayedItem = displayedItem.filter((el) => { // фильтрация по датам
            if (isNaN(dF) && isNaN(dT)) {
                return true;
            } else if (isNaN(dT)) {
                return dF <= el.date;
            } else if (isNaN(dF)) {
                return dT >= el.date;
            } else if (dF <= el.date && dT >= el.date) {
                return true;
            }
        });

        displayedItem = displayedItem.filter((el) => { // фильтрация по лектору
            if (t === 'Все') {
                return true;
            } else if (t === el.teacher.name) {
                return true;
            }
        });

        displayedItem = displayedItem.filter((el) => { // фильтрация по школе
            if (sC === 'Все') {
                return true;
            } else if (sC === el.school.name) {
                return true;
            }
        });

        displayedItem = displayedItem.filter((el) => { // фильтрация по classRoom
            if (cR === 'Все') {
                return true;
            } else if (cR === el.classRoom.name) {
                return true;
            }
        });

        return displayedItem;
    }

    test() {
        console.log('hi');
    }

    setLecture() {
        const lect = document.querySelector('#lecture').value;
        const teacher = document.querySelector('#teacher').value;
        const comp = document.querySelector('#company').value;
        const sch = document.querySelector('#school').value;
        const inputStartTime = document.querySelector('#startTime').value;
        const inputEndTime = document.querySelector('#endTime').value;
        const classRoom = document.querySelector('#classRoom').value;
        const amountOfStudents = document.querySelector('#amountOfStudents').value;
        const loc = document.querySelector('#location').value;
        const inputDate = document.querySelector('#date').value;
        const errArr = [];

        if (this.fullValidation(lect, teacher, comp, sch, inputStartTime, inputEndTime, classRoom, amountOfStudents, loc, inputDate, errArr)) {
            console.log('send data to firebase');

            // const newPostKey = firebase.database().ref().child('posts').push().key; // генерим уникальный id
            //     firebase.database().ref('lectures/' + newPostKey).set({
            //         id: newPostKey,
            //         classRoom: {
            //             id: classRoomId,
            //             maxStudents: classRoomCapacity,
            //             name: classRoom,
            //         },
            //         company: comp,
            //         date: secFrom,
            //         endTime: secTo,
            //         isDeleted: false,
            //         lecture: lect,
            //         location: loc,
            //         school: {
            //             id: schoolId,
            //             name: sch,
            //         },
            //         teacher: {
            //             id: teacherId,
            //             name: teacher,
            //         },
            //     });

            // schoolId = false; // обнуляем значение на случай если будет добавлено более 1й лекции подряд
            // teacherId = false;
            // classRoomId = false;
        }

        return errArr;
    }

    fullValidation(lect, teacher, comp, sch, inputStartTime, inputEndTime, classRoom, amountOfStudents, loc, inputDate, errArr) {
        const startT = inputStartTime.split(':');
        const endT = inputEndTime.split(':');
        const date = inputDate.split('-');
        const secFrom = new Date(date[0], date[1] - 1, date[2], startT[0], startT[1]).getTime();
        const secTo = new Date(date[0], date[1] - 1, date[2], endT[0], endT[1]).getTime();
        let classRoomCapacity = null;

        if (!checkInputFields(inputDate, lect, teacher, comp, sch, inputStartTime, inputEndTime, classRoom, amountOfStudents, loc)) {
            errArr.push('Все поля должны быть заполнены');

            return false;
        }

        if (!checkIfStartTimeIsEarlierThanEndTime(secFrom, secTo, errArr)) {
            errArr.push('Начало лекции не может быть позже ее конца');

            return false;
        }

        if (!matchTeacher(TEACHERS, LECTURES, teacher, errArr, secFrom, secTo)) {
            errArr.push('Этот преподаватель ведет лекцию в это время');

            return false;
        }

        if (!matchSchool(SCHOOLS, LECTURES, sch, errArr, secFrom, secTo)) {
            errArr.push('У этой школы в это время уже есть лекция');

            return false;
        }

        if (!matchClassRoom(CLASSROOMS, LECTURES, classRoom, errArr, secFrom, secTo, amountOfStudents)) {
            errArr.push('В этой аудитории в это время идет есть лекция');

            return false;
        }

        errArr.push('Все проверки пройдены');

        return true;
    }
}

export default new API();
