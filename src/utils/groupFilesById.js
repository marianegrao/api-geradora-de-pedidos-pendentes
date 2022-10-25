const fs = require("fs/promises");
const { schemaNote } = require("../validations/schemaNotes");
const { convertTxtFileInObject } = require("./convertTxtFileInObject");

async function groupFilesById(directory, fileId) {
	let allFiles = [];
	try {
		const listOfFilesInADirectory = await fs.readdir(directory);

		for (let i = 1; i < listOfFilesInADirectory.length + 1; i++) {
			const file = await fs.readFile(`${directory}/${fileId}${i}.txt`);

			const fileObject = convertTxtFileInObject(file.toString());
			if (fileId === "N") {
				await schemaNote(fileObject);
			} else {
			}
			allFiles.push({ id: i, data: fileObject });
		}

		return allFiles;
	} catch (error) {
		console.log(error);
	}
}

module.exports = { groupFilesById };
