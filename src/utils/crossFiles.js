const readAllNotes = require("./readAllNotes");
const readAllRequest = require("./readAllRequests");

function crossFiles(listOfRequests, listOfNotes) {
	const response = {};
	const allItemsInAnRequest = readAllRequest(listOfRequests);

	if (allItemsInAnRequest.error) {
		(response.error = true), (response.message = allItemsInAnRequest.message);
		return response;
	}

	readAllNotes(listOfNotes, allItemsInAnRequest.allItems);

	const pendingItems = allItemsInAnRequest.allItems.filter((i) => {
		return i.item.saldo_quantidade !== 0;
	});

	response.allItems = pendingItems;
	return response;
}
module.exports = crossFiles;
