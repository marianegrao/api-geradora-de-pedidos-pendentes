const crossFiles = require("./crossFiles");
const groupFilesByIdInArray = require("./groupFilesByIdInArray");
const listPendingItems = require("./listPendingItems");
const checkExcessProducts = require("./checkExcessProducts");
async function listPendingRequest() {
	try {
		const listOfRequests = await groupFilesByIdInArray(
			"./src/data/Pedidos",
			"P"
		);

		const listOfNotes = await groupFilesByIdInArray("./src/data/Notas", "N");

		const pendingItems = crossFiles(listOfRequests, listOfNotes);

		checkExcessProducts(pendingItems);

		const listOfPendingItems = listPendingItems(pendingItems, listOfRequests);

		return listOfPendingItems;
	} catch (error) {
		console.log(error);
	}
}

module.exports = listPendingRequest;
