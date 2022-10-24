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
	const fileJsonToObject = JSON.parse(validJson);
	for (const value of fileJsonToObject) {
		if (value.valor_unitário_produto) {
			value.valor_unitário_produto = Number(
				value.valor_unitário_produto.replace(",", ".")
			).toFixed(2);
		}
	}
	return fileJsonToObject;
}

module.exports = { convertTxtFileInObject };
