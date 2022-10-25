const fs = require("fs/promises");
const calculateAmountOfRequestById = require("./utils/calculateAmountOfRequestById");
const showAllNotes = require("./utils/showAllNotes");
const showAllRequests = require("./utils/showAllRequests");
const convertObjectInTxtFile = require("./utils/convertObjectInTxtFile");

async function showPendingRequest() {
	try {
		const listOfRequests = await showAllRequests();
		const listOfNotes = await showAllNotes();

		let allItemsInAnRequest = [];

		for (const request of listOfRequests) {
			let minItemNumber = 1;
			let maxItemNumber = request.data.length;
			let itemNumberAlredyExists = 0;
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
				if (requestData.número_item === itemNumberAlredyExists) {
					return console.log("Numero de item repetido");
				}
				itemNumberAlredyExists = requestData.número_item;

				if (
					requestData.número_item < minItemNumber ||
					requestData.número_item > maxItemNumber
				) {
					return console.log("Numero de item inválido");
				}

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

		const isQuantityOfProductExceeded = [];
		pendingItems.forEach((request) => {
			if (request.item.saldo_quantidade < 0) {
				isQuantityOfProductExceeded.push({
					...request,
					item: {
						número_item: request.item.número_item,
						saldo_quantidade: -1 * request.item.saldo_quantidade,
						valor_total_execedido: -1 * request.item.valor_total_produto,
					},
				});
			}
		});

		if (isQuantityOfProductExceeded.length > 0) {
			console.log(
				"Esse(s) item(ns) execederam a quantidade: ",
				isQuantityOfProductExceeded
			);
		}

		let listOfPendingItems = [];

		for (const item of pendingItems) {
			let pedido = {
				id_pedido: item.id_pedido,
				valor_total: calculateAmountOfRequestById(
					listOfRequests,
					item.id_pedido
				),
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

async function createFileTxt() {
	try {
		const objectOfPendingItems = await showPendingRequest();
		const fileTxt = await convertObjectInTxtFile(objectOfPendingItems);
		await fs.appendFile("./src/data/PedidosPendentes.txt", fileTxt);
		console.log(objectOfPendingItems);
	} catch (error) {
		console.log(error);
	}
}

createFileTxt();
