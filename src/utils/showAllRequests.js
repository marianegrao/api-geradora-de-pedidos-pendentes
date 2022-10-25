const { groupFilesById } = require("./groupFilesById");

async function showAllRequests() {
	try {
		const listOfRequests = await groupFilesById("./src/data/Pedidos", "P");
		return listOfRequests;
	} catch (error) {
		console.log(error);
	}
}

module.exports = showAllRequests;
