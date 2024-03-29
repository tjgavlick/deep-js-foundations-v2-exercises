function printRecords(recordIds) {
	records = studentRecords
		.filter(record => recordIds.includes(record.id))
		.sort((a, b) => {
			if (a.name < b.name) {
				return -1;
			} else if (a.name > b.name) {
				return 1;
			}
			return 0;
		});
	for (let record of records) {
		console.log(`${record.name} (${record.id}): ${record.paid ? 'Paid' : 'Not Paid'}`);
	}
}

function paidStudentsToEnroll() {
	let studentsToEnroll = studentRecords
		.filter(record => record.paid === true && currentEnrollment.includes(record.id))
		.map(record => record.id);
	return [...studentsToEnroll, ...currentEnrollment];
}

function remindUnpaid(recordIds) {
	let unpaidStudentIds = recordIds
		.map(id => studentRecords.find(record => record.id == id))
		.filter(record => !record.paid && currentEnrollment.includes(record.id))
		.map(record => record.id);
	printRecords(unpaidStudentIds);
}


// ********************************

var currentEnrollment = [ 410, 105, 664, 375 ];

var studentRecords = [
	{ id: 313, name: "Frank", paid: true, },
	{ id: 410, name: "Suzy", paid: true, },
	{ id: 709, name: "Brian", paid: false, },
	{ id: 105, name: "Henry", paid: false, },
	{ id: 502, name: "Mary", paid: true, },
	{ id: 664, name: "Bob", paid: false, },
	{ id: 250, name: "Peter", paid: true, },
	{ id: 375, name: "Sarah", paid: true, },
	{ id: 867, name: "Greg", paid: false, },
];

printRecords(currentEnrollment);
console.log("----");
currentEnrollment = paidStudentsToEnroll();
printRecords(currentEnrollment);
console.log("----");
remindUnpaid(currentEnrollment);

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
