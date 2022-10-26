const fs = require("fs/promises");
const showPendingRequest = require("./listPendingRequest");
const convertObjectInTxtFile = require("./convertObjectInTxtFile");

async function createPendingRequestsFile(directory) {
	try {
		const objectOfPendingItems = await showPendingRequest();
		const validJson = await convertObjectInTxtFile(objectOfPendingItems);
		await fs.appendFile(directory, validJson);
	} catch (error) {
		console.log(error);
	}
}

module.exports = createPendingRequestsFile;
