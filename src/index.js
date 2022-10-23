const fs = require("fs/promises");
const { convertTxtFileInObject } = require("./utils/convertTxtFileInObject");

async function convertAllNotesInArray() {
	let allNotes = [];
	try {
		const quantityOfNotes = await fs.readdir("./Notas");
		for (let i = 1; i < quantityOfNotes.length + 1; i++) {
			const note = await fs.readFile(`./Notas/N${i}.txt`);
			const noteData = convertTxtFileInObject(note.toString());
			allNotes.push(noteData);
		}
		console.log(allNotes);
	} catch (error) {
		console.log(error);
	}
}

convertAllNotesInArray();
