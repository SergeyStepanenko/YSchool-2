import {checkInputFields, checkIfStartTimeIsEarlierThanEndTime, matchByName, generateNewId, matchLectures, addClassRoomCapacity, checkInstances} from '../utils/addLectureValidation.js';

const database = firebase.database();

let LECTURES;
let TEACHERS;
let CLASSROOMS;
let SCHOOLS;

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
                id: Obj[id].teacher.id,
                name: Obj[id].teacher.name,
                lectures: [
                    ...(this.teachers[teacherId] && this.teachers[teacherId].lectures || []),
                    id
                ],
            };

            const classRoomId = [Obj[id].classRoom.id];
            const classRoom = Obj[id].classRoom;

            this.classRooms[classRoomId] = {
                id: Obj[id].classRoom.id,
                name: classRoom.name,
                maxStudents: classRoom.maxStudents,
                lectures: [
                    ...(this.classRooms[classRoomId] && this.classRooms[classRoomId].lectures || []),
                    id
                ],
            };

            const schoolId = [Obj[id].school.id];

            this.schools[schoolId] = {
                id: Obj[id].school.id,
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
        const startT = inputStartTime.split(':');
        const endT = inputEndTime.split(':');
        const date = inputDate.split('-');
        const secFrom = new Date(date[0], date[1] - 1, date[2], startT[0], startT[1]).getTime();
        const secTo = new Date(date[0], date[1] - 1, date[2], endT[0], endT[1]).getTime();

        const validatedData = this.fullValidation(lect, teacher, comp, sch, inputStartTime, inputEndTime, classRoom, amountOfStudents, loc, inputDate, errArr, startT, endT, date, secFrom, secTo);

        if (validatedData) {
            const newPostKey = firebase.database().ref().child('posts').push().key; // генерим уникальный id
                firebase.database().ref('lectures/' + newPostKey).set({
                    id: newPostKey,
                    classRoom: {
                        id: validatedData.cRiD,
                        maxStudents: validatedData.cRcP,
                        name: classRoom,
                    },
                    company: comp,
                    date: secFrom,
                    endTime: secTo,
                    isDeleted: false,
                    lecture: lect,
                    location: loc,
                    school: {
                        id: validatedData.sCiD,
                        name: sch,
                    },
                    teacher: {
                        id: validatedData.tCiD,
                        name: teacher,
                    },
                });
        }

        return errArr;
    }

    fullValidation(lect, teacher, comp, sch, inputStartTime, inputEndTime, classRoom, amountOfStudents, loc, inputDate, errArr, startT, endT, date, secFrom, secTo) {
        if (!checkInputFields(inputDate, lect, teacher, comp, sch, inputStartTime, inputEndTime, classRoom, amountOfStudents, loc)) {
            errArr.push('Все поля должны быть заполнены');

            return false;
        }

        checkInstances(inputDate, lect, teacher, comp, sch, inputStartTime, inputEndTime, classRoom, amountOfStudents, loc);

        if (!checkIfStartTimeIsEarlierThanEndTime(secFrom, secTo, errArr)) {
            errArr.push('Начало лекции не может быть позже ее конца');

            return false;
        }
// проверка учителя
        let teacherId = matchByName(TEACHERS, teacher); // если id учителя есть в базе - этот id присваивается переменной
        if (teacherId) { // если id учителя найден - мы ищем лекции, которые ведет этот учитель и сверяем по времени, есть ли пересечения
            const noIntersections = matchLectures(TEACHERS, LECTURES, teacherId, secFrom, secTo);
            if (!noIntersections) { // если есть пересечения - выводим ошибку
                errArr.push('Этот преподаватель ведет лекцию в это время');

                return false;
            }
        }
        if (!teacherId) teacherId = generateNewId(); // если его нет - генерится новый id
// проверка школы
        let schoolId = matchByName(SCHOOLS, sch); // если id школы есть в базе - этот id присваивается переменной
        if (schoolId) { // если id школы найден - мы ищем лекции в базе, которые идут у этой школы и сверяем по времени, есть ли пересечения
            const noIntersections = matchLectures(SCHOOLS, LECTURES, schoolId, secFrom, secTo);
            if (!noIntersections) { // если есть пересечения - выводим ошибку
                errArr.push('У этой школы в это время идет другая лекция');

                return false;
            }
        }
        if (!schoolId) schoolId = generateNewId(); // если его нет - генерится новый
// проверка аудитории
        let classRoomId = matchByName(CLASSROOMS, classRoom); // если id аудитории есть в базе - этот id присваивается переменной
        if (classRoomId) { // если id аудитории найден - мы ищем лекции в базе, которые идут в этой аудитории и сверяем по времени, есть ли пересечения
            const noIntersections = matchLectures(CLASSROOMS, LECTURES, classRoomId, secFrom, secTo);
            if (!noIntersections) { // если есть пересечения - выводим ошибку
                errArr.push('В этой аудитории в это время идет другая лекция');

                return false;
            }
        }

        const classRoomCapacity = addClassRoomCapacity(CLASSROOMS, classRoomId);

        if (amountOfStudents > classRoomCapacity) {
            errArr.push('Вместимость этой аудитории(' + classRoomCapacity + ' человек). Вы указали ' + amountOfStudents);

            return false;
        }

        if (!classRoomId) classRoomId = generateNewId(); // если его нет - генерится новый id

        const validatedData = {
            cRiD: classRoomId,
            cRcP: classRoomCapacity,
            sCiD: schoolId,
            tCiD: teacherId,
        };

        errArr.push('Все проверки пройдены');

        return validatedData;
    }
}

export default new API();
