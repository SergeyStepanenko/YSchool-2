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
