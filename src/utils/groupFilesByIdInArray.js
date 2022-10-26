const fs = require("fs/promises");
const { convertTxtFileInObject } = require("./convertTxtFileInObject");
const validateKeysOfObjects = require("./validateKeysOfObjects");

async function groupFilesByIdInArray(directory, fileId) {
	let allFiles = [];
	let response = {};
	let isAnyError = 0;
	try {
		const listOfFilesInADirectory = await fs.readdir(directory);

		for (let i = 1; i < listOfFilesInADirectory.length + 1; i++) {
			const file = await fs.readFile(`${directory}/${fileId}${i}.txt`);

			const fileObject = convertTxtFileInObject(file.toString());

			fileObject.forEach(async (obj) => {
				const data = await validateKeysOfObjects(directory, obj);

				if (data.error) {
					response = data;
					isAnyError = true;
				}
			});

			allFiles.push({ id: i, data: fileObject });
		}

		if (isAnyError) {
			return response;
		} else {
			response.allFiles = allFiles;
			response.error = false;

			return response;
		}
	} catch (error) {
		response.error = true;
		response.message = error.message;
		return response;
	}
}

module.exports = groupFilesByIdInArray;
