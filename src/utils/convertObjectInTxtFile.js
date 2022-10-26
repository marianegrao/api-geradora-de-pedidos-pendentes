async function convertObjectInTxtFile(object) {
	try {
		const itemsInString = JSON.stringify(object);
		return itemsInString;
	} catch (error) {
		return error;
	}
}
module.exports = convertObjectInTxtFile;
