const fs = require("fs/promises");
const showPendingRequest = require("./listPendingRequest");
const convertObjectInTxtFile = require("./convertObjectInTxtFile");

async function createPendingRequestsFile(directory) {
	const response = {};
	try {
		const objectOfPendingItems = await showPendingRequest();
		const validJson = await convertObjectInTxtFile(objectOfPendingItems);
		await fs.appendFile(directory, validJson);
		response.error = false;
		return response;
	} catch (error) {
		response.error = true;
		response.message = error.message;
		return response;
	}
}

module.exports = createPendingRequestsFile;
