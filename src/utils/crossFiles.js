const readAllNotes = require("./readAllNotes");
const readAllRequest = require("./readAllRequests");

function crossFiles(listOfRequests, listOfNotes) {
	const allItemsInAnRequest = readAllRequest(listOfRequests);

	readAllNotes(listOfNotes, allItemsInAnRequest);

	const pendingItems = allItemsInAnRequest.filter((i) => {
		return i.item.saldo_quantidade !== 0;
	});

	return pendingItems;
}
module.exports = crossFiles;
