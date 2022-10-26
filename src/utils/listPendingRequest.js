const crossFiles = require("./crossFiles");
const groupFilesByIdInArray = require("./groupFilesByIdInArray");
const listPendingItems = require("./listPendingItems");
const checkExcessProducts = require("./checkExcessProducts");
async function listPendingRequest() {
	let response = {};
	try {
		const listOfRequests = await groupFilesByIdInArray(
			"./src/data/Pedidos",
			"P"
		);
		if (listOfRequests.error) {
			response.error = true;
			response.message = listOfRequests.message;
			return response;
		}

		const listOfNotes = await groupFilesByIdInArray("./src/data/Notas", "N");

		if (listOfNotes.error) {
			response.error = true;
			response.message = listOfNotes.message;
			return response;
		}

		const pendingItems = crossFiles(
			listOfRequests.allFiles,
			listOfNotes.allFiles
		);

		checkExcessProducts(pendingItems);

		const listOfPendingItems = listPendingItems(
			pendingItems,
			listOfRequests.allFiles
		);

		response.listOfPendingItems = listOfPendingItems;
		response.error = false;

		return response;
	} catch (error) {
		response.error = true;
		response.message = error;
		return response;
	}
}
module.exports = listPendingRequest;
