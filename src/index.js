const fs = require("fs/promises");
const { convertTxtFileInObject } = require("./utils/convertTxtFileInObject");

async function readingFirstNote() {
	try {
		const note = await fs.readFile("./Notas/N1.txt");
		console.log(convertTxtFileInObject(note.toString()));
	} catch (error) {
		console.log(error);
	}
}

readingFirstNote();
