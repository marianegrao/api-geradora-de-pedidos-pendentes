function readAllRequest(listOfRequests) {
	let allItems = [];
	const response = {};
	let isAnyError = false;

	for (const request of listOfRequests) {
		let minItemNumber = 1;
		let maxItemNumber = request.data.length;
		let itemNumberAlredyExists = 0;
		for (const requestData of request.data) {
			const pendingItems = {
				id_pedido: request.id,
				item: {
					número_item: requestData.número_item,
					saldo_quantidade: requestData.quantidade_produto,
					valor_unitário_produto: requestData.valor_unitário_produto,
					valor_total_produto:
						requestData.valor_unitário_produto * requestData.quantidade_produto,
				},
			};
			if (requestData.número_item === itemNumberAlredyExists) {
				response.error = true;
				response.message = "Número de item repetido";
				isAnyError = true;
			}
			itemNumberAlredyExists = requestData.número_item;

			if (
				requestData.número_item < minItemNumber ||
				requestData.número_item > maxItemNumber
			) {
				response.error = true;
				response.message = "Número de item inválido";
				isAnyError = true;
			}

			allItems.push(pendingItems);
		}
	}

	if (isAnyError) {
		return response;
	} else {
		response.error = false;
		response.allItems = allItems;
		return response;
	}
}

module.exports = readAllRequest;
