import LECTURES from '../../js/lectures'; //все данные о лекциях

const DATA = [];

for (let x in LECTURES) {
	DATA.push(LECTURES[x]);
};

class API {
	initialize() {
		this.lectures = LECTURES;
		this.teachers = {};
		this.classRooms = {};

		const lecturesArray = Object.keys(LECTURES); //массив ключей объекта LECTURES
		lecturesArray.map((id) => {
			const teacherId = [LECTURES[id].teacher.id];

			this.teachers[teacherId] = {
				name: LECTURES[id].teacher.name,
				lectures: [
					...(this.teachers[teacherId] && this.teachers[teacherId].lectures || []),
					id
				],
			};

			const classRoomId = [LECTURES[id].classRoom.id];
			const classRoom = LECTURES[id].classRoom;

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
	}

	getLectures() {
	    return this.lectures;
	};

	getTeachers() {
		return this.teachers;
	};

	filter(dF, dT, t, sC, cR) {
			let displayedItem = DATA;

			displayedItem = displayedItem.filter(function(el) { //фильтрация по датам
				if (isNaN(dF) && isNaN(dT)) {
					return true;
				} else if (isNaN(dT)) {
					return dF <= el.date;
				} else if (isNaN(dF)) {
					return dT >= el.date;
				} else {
					return dF <= el.date && dT >= el.date;
				};
			});

			displayedItem = displayedItem.filter(function(el) { //фильтрация по лектору
				if (t == 'Все') {
					return true;
				} else if (t == el.teacher.name) {
					return true;
				};
			});

			displayedItem = displayedItem.filter(function(el) { //фильтрация по школе
				if (sC == 'Все') {
					return true;
				} else if (sC == el.school.name) {
					return true;
				};
			});

			displayedItem = displayedItem.filter(function(el) { //фильтрация по classRoom
				if (cR == 'Все') {
					return true;
				} else if (cR == el.classRoom.name) {
					return true;
				};
			});

			return displayedItem;
	}

	// setLecture(item) {
	// 	if (true) {
	//
	// 	}
	//
	// 	const {
	// 		date,
	// 		teacher,
	// 	} = item
	//
	// 	return true
	// };


};

export default new API();
