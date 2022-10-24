const { groupFilesById } = require("./utils/groupFilesById");

async function showAllNotes() {
	try {
		const listOfNotes = await groupFilesById("./Notas", "N");
		return listOfNotes;
	} catch (error) {
		console.log(error);
	}
}

async function showAllRequests() {
	try {
		const listOfRequests = await groupFilesById("./Pedidos", "P");
		return listOfRequests;
	} catch (error) {
		console.log(error);
	}
}

async function showPendingRequest() {
	try {
		const listOfRequests = await showAllRequests();
		const listOfNotes = await showAllNotes();

		let allItemsInAnRequest = [];

		for (const request of listOfRequests) {
			for (const requestData of request.data) {
				let pendingItems = {
					id_pedido: request.id,
					número_item: requestData.número_item,
					quantity: requestData.quantidade_produto,
				};
				allItemsInAnRequest.push(pendingItems);

				for (const note of listOfNotes) {
					for (const noteData of note.data) {
						if (
							noteData.id_pedido === request.id &&
							noteData.número_item === requestData.número_item
						) {
							const itemFound = allItemsInAnRequest.find((i) => {
								return (
									i.número_item === noteData.número_item &&
									i.id_pedido === request.id
								);
							});
							if (itemFound) {
								itemFound.quantity -= noteData.quantidade_produto;
							} else {
								pendingItems.quantity -= noteData.quantidade_produto;
							}
						}
					}
				}
			}
		}

		console.log(allItemsInAnRequest);
	} catch (error) {
		console.log(error);
	}
}

showPendingRequest();
