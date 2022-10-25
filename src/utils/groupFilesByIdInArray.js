const fs = require("fs/promises");
const { schemaNote } = require("../validations/schemaNotes");
const { schemaRequest } = require("../validations/schemaRequest");
const { convertTxtFileInObject } = require("./convertTxtFileInObject");

async function groupFilesByIdInArray(directory, fileId) {
	let allFiles = [];
	try {
		const listOfFilesInADirectory = await fs.readdir(directory);

		for (let i = 1; i < listOfFilesInADirectory.length + 1; i++) {
			const file = await fs.readFile(`${directory}/${fileId}${i}.txt`);

			const fileObject = convertTxtFileInObject(file.toString());

			fileObject.forEach(async (file) => {
				if (directory.toLowerCase().includes("notas")) {
					await schemaNote.validate(file);
				} else {
					await schemaRequest.validate(file);
				}
			});

			allFiles.push({ id: i, data: fileObject });
		}

		return allFiles;
	} catch (error) {
		console.log(error);
	}
}

module.exports = groupFilesByIdInArray;
