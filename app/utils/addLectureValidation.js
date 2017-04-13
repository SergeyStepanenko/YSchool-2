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

function checkIntersection(newStart, newEnd, existStart, existEnd) {
    if (newStart <= existStart && newEnd <= existStart ||
        newStart >= existEnd && newEnd >= existEnd) { // проверяем чтобы не было пересечений с другими лекциями
        return true;
    }

    return false;
}

export function matchByName(entity, inputVal) {
    const foundObj = Object.values(entity).find((obj) => obj.name === inputVal);

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
            if (!checkIntersection(secFrom, secTo, database[IdsArr[i]].date, database[IdsArr[i]].endTime)) {
                trueOrFalse = false;
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
