function checkExcessProducts(pendingItems) {
	let isQuantityOfProductExceeded = [];
	const response = {
		error: false,
		message: "Esse(s) item(ns) excederam a quantidade",
		item: isQuantityOfProductExceeded,
	};
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
		response.error = true;
		return response;
	} else {
		return response;
	}
}
module.exports = checkExcessProducts;
