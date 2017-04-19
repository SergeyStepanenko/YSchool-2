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

export function checkInstances(inputDate, lect, teacher, comp, sch, inputStartTime, inputEndTime, classRoom, amountOfStudents, loc) {

    // console.log(lect instanceof String);
    // console.log(typeof(inputDate));
    // console.log(typeof(lect));
    // console.log(typeof(teacher));
    // console.log(typeof(comp));
    // console.log(typeof(sch));
    // console.log(typeof(inputStartTime));
    // console.log(typeof(amountOfStudents));
    // if (true) {
    //     return false;
    // }

    return true;
}

export function checkIfStartTimeIsEarlierThanEndTime(secFrom, secTo) {
    if (secFrom > secTo) {
        return false;
    }

    return true;
}

function checkIntersection(newStart, newEnd, existStart, existEnd) {
    if (newStart <= existStart && newEnd <= existStart ||
        newStart >= existEnd && newEnd >= existEnd) { // проверяем чтобы не было пересечений с другими лекциями
        return true;
    }

    return false;
}

export function matchByName(entity, inputVal) {
    // const foundObj = Object.values(entity).find((obj) => obj.name === inputVal); // Object.values не работает в IE
    let foundObj;
    Object.keys(entity).map((key) => {
        if (entity[key].name === inputVal) foundObj = entity[key];

        return foundObj;
    });

    if (foundObj) { // если ID в базе школ найден, тогда присваиваем его переменной
        return foundObj.id;
    }

    return false;
}

export function matchLectures(entity, database, id, secFrom, secTo) {
    let trueOrFalse = true;
    Object.keys(entity).map((key) => {
        const IdsArr = entity[key].lectures;
        for (let i = 0; i < IdsArr.length; i++) {
            if (id === entity[key].id) { // если id (преподавателя\лекции\школы совпадает с id в базе - проводится сверка по времени)
                if (!checkIntersection(secFrom, secTo, database[IdsArr[i]].date, database[IdsArr[i]].endTime)) {
                    trueOrFalse = false;
                }
            }
        }

        return trueOrFalse;
    });

    return trueOrFalse;
}

export function generateNewId() {
    return firebase.database().ref().child('posts').push().key;
}

export function addClassRoomCapacity(CLASSROOMS, classRoomId) {
    if (classRoomId) { // если ID аудитории найден в базе, то этой аудитории присваивается своя вместимось
        return CLASSROOMS[classRoomId].maxStudents;
    }

    if (!classRoomId) { // если ID аудитории не найден в базе, то у пользователя запрашивается вместимость аудитории
        while (!classRoomId) {
            classRoomId = Number(prompt('Введите вместимость аудитории', 15));

            return classRoomId;
        }
    }
}
