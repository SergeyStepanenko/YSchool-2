import LECTURES from '../../js/lectures';
// import ScheduleApp from '../components/schedule/index.jsx'

const database = firebase.database();
const rootRef = database.ref('lectures');

class API {
    initialize(Obj) {
        // rootRef.on('value', (snap) => {
        //     const FIREBASEDATA = [];
        //     const Obj = snap.val();
        //     for (const x in Obj) {
        //         if (Object.prototype.hasOwnProperty.call(Obj, x)) {
        //             FIREBASEDATA.push(Obj[x]);
        //         }
        //     }
            this.lectures = Obj;
            this.teachers = {};
            this.classRooms = {};

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

                return id;
            });


        console.log(this.lectures);
        console.log(this.teachers);
        console.log(this.classRooms);
        // });
    }

    getLectures() {
        console.log(this.lectures);
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
        const date = new Date(document.querySelector('#date').value.replace('-', ', ')).getTime();
        const lect = document.querySelector('#lecture').value;
        const teacher = document.querySelector('#teacher').value;
        const comp = document.querySelector('#company').value;
        const sch = document.querySelector('#school').value;
        const startT = document.querySelector('#startTime').value.split(':');
        const endT = document.querySelector('#endTime').value.split(':');
        const classRoom = document.querySelector('#classRoom').value;
        const amountOfStudents = document.querySelector('#amountOfStudents').value;
        const loc = document.querySelector('#location').value;

        const secondsStart = (startT[0] * 3600 + startT[1] * 60) * 1000;
        const secondsEnd = (endT[0] * 3600 + endT[1] * 60) * 1000;
        const newPostKey = firebase.database().ref().child('posts').push().key; // генерим уникальный id

            firebase.database().ref('lectures/' + newPostKey).set({
                id: newPostKey,
                classRoom: {
                    id: time,
                    maxStudents: amountOfStudents,
                    name: classRoom,
                },
                company: comp,
                date: date + secondsStart,
                endTime: date + secondsEnd,
                isDeleted: false,
                lecture: lect,
                location: loc,
                school: {
                    id: time + '1',
                    name: sch,
                },
                teacher: {
                    id: time + '2',
                    name: teacher,
                },
            });
    }
}

export default new API();
