async function convertObjectInTxtFile(object) {
	try {
		const itemsInString = JSON.stringify(object);
		return itemsInString;
	} catch (error) {
		console.log(error);
	}
}
module.exports = convertObjectInTxtFile;
