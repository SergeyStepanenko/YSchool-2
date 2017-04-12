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
    let pass = true;
    Object.keys(TEACHERS).map((key) => {
        if (teacher === TEACHERS[key].name) { // сверяем есть ли в базе такой учитель
            const lectureId = TEACHERS[key].lectures;
            for (let i = 0; i < lectureId.length; i++) {
                teacherId = key; // присваиваем ключ учителя
                console.info('ID найденого в базе учителя ' + teacherId);
                if (!checkIntersection(secFrom, secTo, LECTURES[lectureId[i]].date, LECTURES[lectureId[i]].endTime)) {
                    pass = false;
                }
            }
        }
    });
    generateIdForTheNewTeacher(teacherId);

    return pass;
}

function generateIdForTheNewSchool(schoolId) {
    if (!schoolId) {
        schoolId = firebase.database().ref().child('posts').push().key;
        console.info('id для новой школы ' + schoolId);
    }
}

export function matchSchool(SCHOOLS, LECTURES, sch, errArr, secFrom, secTo) {
    let schoolId = false;
    let pass = true;
    Object.keys(SCHOOLS).map((key) => {
        if (sch === SCHOOLS[key].name) { // сверяем есть ли в базе такая школа
            const lectureId = SCHOOLS[key].lectures;
            for (let i = 0; i < lectureId.length; i++) {
                if (!checkIntersection(secFrom, secTo, LECTURES[lectureId[i]].date, LECTURES[lectureId[i]].endTime)) {
                    schoolId = key; // присваиваем ключ школы
                    console.info('ID найденной в базе школы ' + schoolId);

                    pass = false;
                }
            }
        }
    });
    generateIdForTheNewSchool(schoolId);

    return pass;
}

function generateIdForTheNewClassRoom(classRoomId) {
    if (!classRoomId) {
        classRoomId = firebase.database().ref().child('posts').push().key;
        console.info('id для новой школы ' + classRoomId);
    }
}

export function matchClassRoom(CLASSROOMS, LECTURES, classRoom, errArr, secFrom, secTo, amountOfStudents) {
    let classRoomId = false;
    let pass = true;
    let classRoomCapacity = null;
    let isClassRoomFound = false;
    let ObjKey;
    Object.keys(CLASSROOMS).map((key) => {
        if (classRoom === CLASSROOMS[key].name) { // сверяем есть ли в базе такая школа
            isClassRoomFound = true;
            ObjKey = key;
            console.log(isClassRoomFound);
            const lectureId = CLASSROOMS[key].lectures;
            for (let i = 0; i < lectureId.length; i++) {
                if (!checkIntersection(secFrom, secTo, LECTURES[lectureId[i]].date, LECTURES[lectureId[i]].endTime, key)) {
                    classRoomId = key; // присваиваем ключ школы
                    classRoomCapacity = CLASSROOMS[key].maxStudents;
                    console.info('ID найденной в базе аудитории ' + classRoomId);
                    isClassRoomFound = true;
                    pass = false;
                }
            }
        }
    });

    if (!isClassRoomFound) {
        classRoomId = firebase.database().ref().child('posts').push().key;
        console.info('id для новой аудитории ' + classRoomId);
    } else {
        classRoomCapacity = ObjKey;
    }

    if (classRoomCapacity === null) { // проверяем на тип введенных данных
        classRoomCapacity = Number(prompt('Этой аудитории нет в базе. Введите вместимость аудитории', '20'));
        console.log(classRoomCapacity);
        if (isNaN(classRoomCapacity) || classRoomCapacity === 0) {
            while (isNaN(classRoomCapacity)) {
                classRoomCapacity = Number(prompt('Это должно быть число, например:', '20'));
            }
        }
    }

    if (classRoomCapacity < amountOfStudents) {
        errArr.push('Вместимость аудитории ' + classRoomCapacity + ' (' + classRoomCapacity + ' человек). Вы указали ' + amountOfStudents);

        return false;
    }

    return pass;
}
