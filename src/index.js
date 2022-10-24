const { groupFilesById } = require("./utils/groupFilesById");
const fs = require("fs/promises");
async function showAllNotes() {
	try {
		const listOfNotes = await groupFilesById("./src/data/Notas", "N");
		return listOfNotes;
	} catch (error) {
		console.log(error);
	}
}

async function showAllRequests() {
	try {
		const listOfRequests = await groupFilesById("./src/data/Pedidos", "P");
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
					item: {
						número_item: requestData.número_item,
						saldo_quantidade: requestData.quantidade_produto,
						valor_total_produto:
							requestData.valor_unitário_produto *
							requestData.quantidade_produto,
					},
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
									i.item.número_item === noteData.número_item &&
									i.id_pedido === request.id
								);
							});

							if (itemFound) {
								itemFound.item.saldo_quantidade -= noteData.quantidade_produto;
								itemFound.item.valor_total_produto =
									requestData.valor_unitário_produto *
									itemFound.item.saldo_quantidade;
							} else {
								pendingItems.item.saldo_quantidade -=
									noteData.quantidade_produto;
								pendingItems.item.valor_total_produto =
									requestData.valor_unitário_produto *
									pendingItems.item.saldo_quantidade;
							}
						}
					}
				}
			}
		}

		const pendingItems = allItemsInAnRequest.filter((request) => {
			return request.item.saldo_quantidade !== 0;
		});

		let listOfPendingItems = [];

		function amoutOfRequistById(id) {
			let amoutForAIdEspecific = 0;
			for (const request of listOfRequests) {
				if (request.id === id) {
					for (const requestData of request.data) {
						amoutForAIdEspecific +=
							requestData.valor_unitário_produto *
							requestData.quantidade_produto;
					}
				}
			}
			return amoutForAIdEspecific;
		}

		for (const item of pendingItems) {
			let pedido = {
				valor_total: amoutOfRequistById(item.id_pedido),
				id_pedido: item.id_pedido,
				saldo_valor: 0,
				itens: [],
			};

			const itemFound = listOfPendingItems.find((i) => {
				return i.id_pedido === item.id_pedido;
			});

			if (itemFound) {
				itemFound.itens.push(item.item);
				itemFound.saldo_valor += item.item.valor_total_produto;
			} else {
				pedido.saldo_valor += item.item.valor_total_produto;
				pedido.itens.push(item.item);
				listOfPendingItems.push(pedido);
			}
		}

		return listOfPendingItems;
	} catch (error) {
		console.log(error);
	}
}

async function convertObjectInTxtFile() {
	try {
		const pendingItems = await showPendingRequest();
		const txtFile = JSON.stringify(pendingItems);
		return txtFile;
	} catch (error) {
		console.log(error);
	}
}

async function createFileTxt() {
	try {
		const fileTxt = await convertObjectInTxtFile();
		await fs.appendFile("./src/data/PedidosPendentes.txt", fileTxt);
	} catch (error) {
		console.log(error);
	}
}

createFileTxt();
