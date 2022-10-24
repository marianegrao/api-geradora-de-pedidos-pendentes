const { groupFilesById } = require("./utils/groupFilesById");

async function showAllNotes() {
	try {
		const listOfNotes = await groupFilesById("./Notas", "N");
		return listOfNotes;
	} catch (error) {
		console.log(error);
	}
}

async function showAllRequests() {
	try {
		const listOfRequests = await groupFilesById("./Pedidos", "P");
		return listOfRequests;
	} catch (error) {
		console.log(error);
	}
}

async function showPendingRequest() {
	try {
		const listOfRequests = await showAllRequests();
		const listOfNotes = await showAllNotes();

		console.log(listOfRequests, "-----", listOfNotes);
	} catch (error) {
		console.log(error);
	}
}

showPendingRequest();
