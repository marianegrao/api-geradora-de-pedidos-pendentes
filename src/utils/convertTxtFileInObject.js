function convertTxtFileInObject(fileInTxt) {
	const fileInTextFormated = `[${fileInTxt}]`;
	let validJson = "";

	for (let i = 0; i < fileInTextFormated.length; i++) {
		if (fileInTextFormated[i] === "," && fileInTextFormated[i + 1] === "]") {
			validJson[i] = "";
		} else if (
			fileInTextFormated[i] === "}" &&
			fileInTextFormated[i + 1] !== "]"
		) {
			validJson += fileInTextFormated[i] + ",";
		} else {
			validJson += fileInTextFormated[i];
		}
	}
	const noteJsonToObject = JSON.parse(validJson);
	return noteJsonToObject;
}

module.exports = { convertTxtFileInObject };
