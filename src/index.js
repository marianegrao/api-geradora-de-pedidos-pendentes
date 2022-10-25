const fs = require("fs/promises");
const checkExcessProducts = require("./utils/checkExcessProducts");
const convertObjectInTxtFile = require("./utils/convertObjectInTxtFile");
const crossFiles = require("./utils/crossFiles");
const groupFilesByIdInArray = require("./utils/groupFilesByIdInArray");
const listPendingItems = require("./utils/listPendingItems");

async function showPendingRequest() {
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

async function createPendingRequestsFile() {
	try {
		const objectOfPendingItems = await showPendingRequest();
		const fileTxt = await convertObjectInTxtFile(objectOfPendingItems);
		await fs.appendFile("./src/data/PedidosPendentes.txt", fileTxt);
	} catch (error) {
		console.log(error);
	}
}

createPendingRequestsFile();
