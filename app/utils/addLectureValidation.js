export function addLecture() {
    console.log('test1');
}

export function test2() {
    console.log('test2');
}

export function checkInputFields(inputDate, lect, teacher, comp, sch, inputStartTime, inputEndTime, classRoom, amountOfStudents, loc) {
    if (inputDate === ''
    || lect === ''
    || teacher === ''
    || comp === ''
    || sch === ''
    || inputStartTime === ''
    || inputEndTime === ''
    || classRoom === ''
    || amountOfStudents === ''
    || loc === '') {
        return false;
    }

    return true;
}

export function checkIfStartTimeIsEarlierThanEndTime(secFrom, secTo) {
    if (secFrom > secTo) {
        return false;
    }

    return true;
}

export function checkIntersection(newStart, newEnd, existStart, existEnd) {
    if (newStart <= existStart && newEnd <= existStart ||
        newStart >= existEnd && newEnd >= existEnd) { // проверяем чтобы не было пересечений с другими лекциями
        return true;
    }

    return false;
}

function generateIdForTheNewTeacher(teacherId) {
    if (!teacherId) { // если нет введенного учителя в базе учителей, то присваиваем ему новый id
        teacherId = firebase.database().ref().child('posts').push().key;
        console.info('id для нового учителя ' + teacherId);
    }
}

export function matchTeacher(TEACHERS, LECTURES, teacher, errArr, secFrom, secTo) {
    let teacherId = false;
    let x = true;
    Object.keys(TEACHERS).map((key) => {
        if (teacher === TEACHERS[key].name) { // сверяем есть ли в базе такой учитель
            const lectureId = TEACHERS[key].lectures;
            for (let i = 0; i < lectureId.length; i++) {
                if (checkIntersection(secFrom, secTo, LECTURES[lectureId[i]].date, LECTURES[lectureId[i]].endTime, key)) {
                    teacherId = key; // присваиваем ключ учителя
                    console.info('ID найденого в базе учителя ' + teacherId);

                    x = false;
                }
            }
        }
    });
    generateIdForTheNewTeacher(teacherId);

    return x;
}

export function matchSchool(SCHOOLS, LECTURES, sch, errArr, secFrom, secTo) {
    
}
