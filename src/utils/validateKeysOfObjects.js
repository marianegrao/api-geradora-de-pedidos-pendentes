const { schemaNote } = require("../validations/schemaNotes");
const { schemaRequest } = require("../validations/schemaRequest");
async function validateKeysOfObjects(directory, data) {
	const response = {};
	try {
		if (directory.toLowerCase().includes("notas")) {
			await schemaNote.validate(data);
		} else {
			await schemaRequest.validate(data);
		}
		response.error = false;

		return response;
	} catch (error) {
		response.error = true;
		response.message = error.message;
		return response;
	}
}
module.exports = validateKeysOfObjects;
