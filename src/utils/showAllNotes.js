const { groupFilesById } = require("./groupFilesById");

async function showAllNotes() {
	try {
		const listOfNotes = await groupFilesById("./src/data/Notas", "N");
		return listOfNotes;
	} catch (error) {
		console.log(error);
	}
}

module.exports = showAllNotes;
