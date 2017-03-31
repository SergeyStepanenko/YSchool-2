import LECTURES from '../../js/lectures'; //все данные о лекциях

class API {
	initialize() {
		this.lectures = LECTURES;
		this.teachers = {};
		this.classRooms = {};

		const lecturesArray = Object.keys(LECTURES); //массив ключей объекта LECTURES
		lecturesArray.map((id) => {
			const teacherId = [LECTURES[id].lecturer.id];

			this.teachers[teacherId] = {
				name: LECTURES[id].lecturer.name,
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
        console.log(this.teachers);
	}

	getLectures() {
	    return this.lectures;
	};
	//
	// getLecturers() {
	// 	this.rooms = DATA.map(function(el) {
	// 		return el.room
	// 	});
	// };
	//
	// setLecture(item) {
	// 	if (true) {
	//
	// 	}
	//
	// 	const {
	// 		date,
	// 		lecturer,
	// 	} = item
	//
	// 	return true
	// };
};

export default new API();
