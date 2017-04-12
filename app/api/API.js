import addLecture from '../utils/addLectureValidation.js'

const database = firebase.database();
const rootRef = database.ref('lectures');

let LECTURES, TEACHERS, CLASSROOMS, SCHOOLS;

class API {
    initialize(Obj) {
        this.lectures = Obj;
        this.teachers = {};
        this.classRooms = {};
        this.schools = {};
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
        const time = Date.now();
        const lect = document.querySelector('#lecture').value;
        const teacher = document.querySelector('#teacher').value;
        const comp = document.querySelector('#company').value;
        const sch = document.querySelector('#school').value;
        const inputStartTime = document.querySelector('#startTime').value;
        const startT = inputStartTime.split(':');
        const inputEndTime = document.querySelector('#endTime').value;
        const endT = inputEndTime.split(':');
        const classRoom = document.querySelector('#classRoom').value;
        const amountOfStudents = document.querySelector('#amountOfStudents').value;
        const location = document.querySelector('#location').value;
        const inputDate = document.querySelector('#date').value;
        const date = inputDate.split('-');
        const secFrom = new Date(date[0], date[1] - 1, date[2], startT[0], startT[1]).getTime();
        const secTo = new Date(date[0], date[1] - 1, date[2], endT[0], endT[1]).getTime();

        if (inputDate === ''
        || lect === ''
        || teacher === ''
        || comp === ''
        || sch === ''
        || inputStartTime === ''
        || inputEndTime === ''
        || classRoom === ''
        || amountOfStudents === ''
        || location === '') {
            console.log('Все поля должны быть заполнены');

            return false;
        }

        if (secFrom > secTo) {
            console.log('Начало лекции не может быть позже ее конца');

            return false;
        }

        function checkIntersection(newStart, newEnd, existStart, existEnd, key) {
            if (newStart <= existStart && newEnd <= existStart ||
                newStart >= existEnd && newEnd >= existEnd) { // проверяем чтобы не было пересечений с другими лекциями
                return true;
            }
        }
        let teacherId = false;
        Object.keys(TEACHERS).map((key) => {
            if (teacher === TEACHERS[key].name) { // сверяем есть ли в базе такой учитель
                const lectureId = TEACHERS[key].lectures;
                for (let i = 0; i < lectureId.length; i++) {
                    if (checkIntersection(secFrom, secTo, LECTURES[lectureId[i]].date, LECTURES[lectureId[i]].endTime, key)) {
                        teacherId = key; // присваиваем ключ учителя
                        console.log('ID найденого в базе учителя ' + teacherId);
                    } else {
                        console.warn('Этот преподаватель ведет лекцию в это время');
                    }
                }
            }
        });

        if (!teacherId) { // если нет введенного учителя в базе учителей, то присваиваем ему новый id
            teacherId = firebase.database().ref().child('posts').push().key;
            console.log('id для нового учителя ' + teacherId);
        }

        let schoolId = false;
        Object.keys(SCHOOLS).map((key) => {
            if (sch === SCHOOLS[key].name) { // сверяем есть ли в базе такая школа
                const lectureId = SCHOOLS[key].lectures;
                for (let i = 0; i < lectureId.length; i++) {
                    if (checkIntersection(secFrom, secTo, LECTURES[lectureId[i]].date, LECTURES[lectureId[i]].endTime, key)) {
                        schoolId = key; // присваиваем ключ школы
                        console.log('ID найденной в базе школы ' + schoolId);
                    } else {
                        console.warn('У этой школы в это время уже есть лекция');
                    }
                }
            }
        });

        if (!schoolId) { // если нет введенной школы в базе школ, то присваиваем ей новый id
            schoolId = firebase.database().ref().child('posts').push().key;
            console.log('id для новой школы ' + schoolId);
        }

        let classRoomId = false;
        Object.keys(CLASSROOMS).map((key) => {
            if (classRoom === CLASSROOMS[key].name) { // сверяем есть ли в базе такая школа
                const lectureId = CLASSROOMS[key].lectures;
                for (let i = 0; i < lectureId.length; i++) {
                    if (checkIntersection(secFrom, secTo, LECTURES[lectureId[i]].date, LECTURES[lectureId[i]].endTime, key)) {
                        classRoomId = key; // присваиваем ключ школы
                        console.log('ID найденной в базе аудитории ' + classRoomId);
                    } else {
                        console.warn('В этой аудитории в это время идет лекция');
                    }
                }
            }
        });

        if (CLASSROOMS[classRoomId].maxStudents < amountOfStudents) {
            console.warn('Вместимость аудитории classRoom (' + CLASSROOMS[classRoomId].maxStudents + ' человек). Вы указали ' + amountOfStudents);
        }

        if (!classRoomId) { // если нет введенной школы в базе школ, то присваиваем ей новый id
            classRoomId = firebase.database().ref().child('posts').push().key;
            console.log('id для новой аудитории ' + classRoomId);
        }

        // const newPostKey = firebase.database().ref().child('posts').push().key; // генерим уникальный id
        //
        //     firebase.database().ref('lectures/' + newPostKey).set({
        //         id: newPostKey,
        //         classRoom: {
        //             id: time,
        //             maxStudents: amountOfStudents,
        //             name: classRoom,
        //         },
        //         company: comp,
        //         date: date,
        //         endTime: date,
        //         isDeleted: false,
        //         lecture: lect,
        //         location: loc,
        //         school: {
        //             id: time + '1',
        //             name: sch,
        //         },
        //         teacher: {
        //             id: time + '2',
        //             name: teacher,
        //         },
        //     });

        schoolId = false; // обнуляем значение на случай если будет добавлено более 1й лекции подряд
        teacherId = false;
        classRoomId = false;
    }
}

export default new API();
