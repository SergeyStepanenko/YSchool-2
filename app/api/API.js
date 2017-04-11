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
        console.log('API`s ready');
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
        const time = Date.now();
        const lect = document.querySelector('#lecture').value;
        const teacher = document.querySelector('#teacher').value;
        const comp = document.querySelector('#company').value;
        const sch = document.querySelector('#school').value;
        const startT = document.querySelector('#startTime').value.split(':');
        const endT = document.querySelector('#endTime').value.split(':');
        const classRoom = document.querySelector('#classRoom').value;
        const amountOfStudents = document.querySelector('#amountOfStudents').value;
        const loc = document.querySelector('#location').value;
        const inputDate = document.querySelector('#date').value.split('-');
        const secFrom = new Date(inputDate[0], inputDate[1] - 1, inputDate[2], startT[0], startT[1]).getTime();
        const secTo = new Date(inputDate[0], inputDate[1] - 1, inputDate[2], endT[0], endT[1]).getTime();

        if (!isNaN(inputDate) // проверка: заполнены ли все поля
        && lect !== ''
        && teacher !== ''
        && comp !== ''
        && sch !== ''
        && startT !== ''
        && endT !== ''
        && classRoom !== ''
        && amountOfStudents !== ''
        && loc !== '') {
            // console.log('Лекция добавлена');
        } else {
            // console.log('Все поля должны быть заполнены');
        }

        Object.keys(TEACHERS).map((key) => {
            if (teacher === TEACHERS[key].name) {
                const lectureId = TEACHERS[key].lectures;
                for (var i = 0; i < lectureId.length; i++) {
                    if (secFrom <= LECTURES[lectureId[i]].date) {
                        if (secTo >= LECTURES[lectureId[i]].date) {
                            console.log('intersection');
                        }
                    } else {
                        console.log('else');
                    }
                }
            } else {
                // console.log(false);
            }
            // Object.keys(LECTURES).map((key) => {
            //     console.log('inner');
            // });
        });

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
    }
}

export default new API();
