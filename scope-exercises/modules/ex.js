var deepJS = createWorkshop();

// add students
deepJS.addStudent({ id: 313, name: "Frank", paid: true })
deepJS.addStudent({ id: 410, name: "Suzy", paid: true })
deepJS.addStudent({ id: 709, name: "Brian", paid: false })
deepJS.addStudent({ id: 105, name: "Henry", paid: false })
deepJS.addStudent({ id: 502, name: "Mary", paid: true })
deepJS.addStudent({ id: 664, name: "Bob", paid: false })
deepJS.addStudent({ id: 250, name: "Peter", paid: true })
deepJS.addStudent({ id: 375, name: "Sarah", paid: true })
deepJS.addStudent({ id: 867, name: "Greg", paid: false })

// enroll students
deepJS.enrollStudent(410);
deepJS.enrollStudent(105);
deepJS.enrollStudent(664);
deepJS.enrollStudent(374);

// main execution
deepJS.printCurrentEnrollment();
console.log("----");
deepJS.enrollPaidStudents();
deepJS.printCurrentEnrollment();
console.log("----");
deepJS.remindUnpaidStudents();

/*
	Bob (664): Not Paid
	Henry (105): Not Paid
	Sarah (375): Paid
	Suzy (410): Paid
	----
	Bob (664): Not Paid
	Frank (313): Paid
	Henry (105): Not Paid
	Mary (502): Paid
	Peter (250): Paid
	Sarah (375): Paid
	Suzy (410): Paid
	----
	Bob (664): Not Paid
	Henry (105): Not Paid
*/

function createWorkshop() {
	var currentEnrollment = [];
	var studentRecords = [];

	return {
		addStudent: addStudent,
		enrollStudent: enrollStudent,
		printCurrentEnrollment: printCurrentEnrollment,
		enrollPaidStudents: enrollPaidStudents,
		remindUnpaidStudents: remindUnpaidStudents
	};


	function addStudent(studentData) {
		newStudent = Object.create(null);
		newStudent.id = studentData.id;
		newStudent.name = studentData.name;
		newStudent.paid = studentData.paid;
		studentRecords.push(newStudent);
	}

	function enrollStudent(id) {
		if (getStudentFromId(id) != null) {
			currentEnrollment.push(id);
		}
	}

	function printCurrentEnrollment() {
		printRecords(currentEnrollment);
	}

	function enrollPaidStudents() {
		paidUnenrolledStudents = studentRecords.filter(needToEnroll).map(getStudentId);
		for (let student of paidUnenrolledStudents) {
			enrollStudent(student);
		}
	}

	function remindUnpaidStudents() {
		remindUnpaid(currentEnrollment);
	}

	function getStudentFromId(studentId) {
		return studentRecords.find(matchId);

		// *************************

		function matchId(record) {
			return (record.id == studentId);
		}
	}

	function printRecords(recordIds) {
		var records = recordIds.map(getStudentFromId);

		records.sort(sortByNameAsc);

		records.forEach(printRecord);
	}

	function sortByNameAsc(record1,record2){
		if (record1.name < record2.name) return -1;
		else if (record1.name > record2.name) return 1;
		else return 0;
	}

	function printRecord(record) {
		console.log(`${record.name} (${record.id}): ${record.paid ? "Paid" : "Not Paid"}`);
	}

	function paidStudentsToEnroll() {
		var recordsToEnroll = studentRecords.filter(needToEnroll);

		var idsToEnroll = recordsToEnroll.map(getStudentId);

		return [ ...currentEnrollment, ...idsToEnroll ];
	}

	function needToEnroll(record) {
		return (record.paid && !currentEnrollment.includes(record.id));
	}

	function getStudentId(record) {
		return record.id;
	}

	function remindUnpaid(recordIds) {
		var unpaidIds = recordIds.filter(notYetPaid);

		printRecords(unpaidIds);
	}

	function notYetPaid(studentId) {
		var record = getStudentFromId(studentId);
		return !record.paid;
	}
}
