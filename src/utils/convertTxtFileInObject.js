function convertTxtFileInObject(fileInTxt) {
	let validJson = "";

	for (let i = 0; i < fileInTxt.length; i++) {
		if (fileInTxt[i] === "," && fileInTxt[i + 1] === "]") {
			validJson[i] = "";
		} else {
			validJson += fileInTxt[i];
		}
	}

	const noteJsonToObject = JSON.parse(validJson);
	return noteJsonToObject;
}

module.exports = { convertTxtFileInObject };
