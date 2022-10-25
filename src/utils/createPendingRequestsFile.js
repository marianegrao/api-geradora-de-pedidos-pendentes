const fs = require("fs/promises");
const showPendingRequest = require("./listPendingRequest");
const convertObjectInTxtFile = require("./convertObjectInTxtFile");

async function createPendingRequestsFile(directory) {
	try {
		const objectOfPendingItems = await showPendingRequest();
		const fileTxt = await convertObjectInTxtFile(objectOfPendingItems);
		await fs.appendFile(directory, fileTxt);
	} catch (error) {
		console.log(error);
	}
}

module.exports = createPendingRequestsFile;
